const UnitsFactory = require('../models/Units')
const SpawnStars = require('../actions/spawn-stars')
const _ = require('lodash')

let units = {}
let projectiles = {}

function keepOnlyChanges(alreadySendedData, newData) {
	const result = {}
	for (newDataObjectID in newData) {
		const alreadySendedDataObject = alreadySendedData[newDataObjectID]
		if (alreadySendedDataObject) {
			const newObjectDataResult = {}
			const newClientData = newData[newDataObjectID].getClientVariables()
			Object.keys(alreadySendedDataObject).forEach(key => {
				if (newClientData[key] && JSON.stringify(alreadySendedDataObject[key]) != JSON.stringify(newClientData[key])) {
					newObjectDataResult[key] = newClientData[key]
					alreadySendedDataObject[key] = newClientData[key]
				}
			})
			if(!_.isEmpty(newObjectDataResult)) result[newDataObjectID] = newObjectDataResult
		}
	}

	return result
}

function emitGameStateToClients() {
	
	// get new objects to send to all players
	const newUnits = {}
	for (id in global.gameObjects.newObjects.units) {
		newUnits[id] = global.gameObjects.newObjects.units[id].getClientVariables()
		units[id] = newUnits[id]
	}
	const newProjetils = {}
	for (id in global.gameObjects.newObjects.projectiles) {
		newProjetils[id] = global.gameObjects.newObjects.projectiles[id].getClientVariables()
		projectiles[id] = newProjetils[id]
	}

	// send new objects to all players
	if (Object.keys(newUnits).length > 0 || Object.keys(newProjetils).length > 0) {
		setTimeout(() => {
			global.io.compress(true).emit('init', global.encode({
				units: newUnits,
				projectiles: newProjetils,
			}))
		}, 10)
			
		global.gameObjects.newObjects.units = {}
		global.gameObjects.newObjects.projectiles = {}
	}

	// send updated objects to all players (only changes)
	setTimeout(() => {
		global.io.compress(true).emit('update', global.encode({
			units: keepOnlyChanges(units, global.gameObjects.units),
			projectiles: keepOnlyChanges(projectiles, global.gameObjects.projectiles)
		}))
	}, 15)

	// remove itens from server memory
	const removeUnits = global.gameObjects.removeObjects.units
	const removeProjetils = global.gameObjects.removeObjects.projectiles
	removeUnits.forEach(id => {
		delete units[id]
	})
	removeProjetils.forEach(id => {
		delete projectiles[id]
	})

	// send to all players objects that already have been removed (save memory client-side)
	if (removeUnits.length > 0 || removeProjetils.length > 0) {
		setTimeout(() => {
			global.io.compress(true).emit('remove', global.encode({
				units: removeUnits,
				projectiles: removeProjetils,
			}))
		}, 20)
			
		global.gameObjects.removeObjects.units = []
		global.gameObjects.removeObjects.projectiles = []
	}

	// send to players new stars if needed
	setTimeout(() => {
		for (id in global.gameObjects.clients) {
			if (global.gameObjects.clients[id].player) {
				const stars = SpawnStars.getNewVisibleQuadrants(global.gameObjects.clients[id].player.unit.x, global.gameObjects.clients[id].player.unit.y, global.gameObjects.clients[id].player.stars, global.gameObjects.clients[id].player.screenResolution)
				if (stars.length > 0) global.gameObjects.clients[id].socket.compress(true).emit('stars', global.encode(stars))
			}
		}
	}, 30)
}

function unitsGenerateEnergy() {
	for (let i = 0; i < global.gameObjects.clients.length; i++) {
		let player = global.gameObjects.clients[i].player
		if (player) {
			if (player.unit.energy < player.unit.maxEnergy) {
				player.unit.energy += player.unit.reactorSpeed
				if (player.unit.energy > player.unit.maxEnergy) {
					player.unit.energy = player.unit.maxEnergy
				}
			}
		}
	}
}

function spawnAsteroids() {
	for (id in global.gameObjects.units) {
		if (global.gameObjects.units[id].isPlayer) {
			const x = global.gameObjects.units[id].x + Math.floor((-25000 + Math.random() * 50000))
			const y = global.gameObjects.units[id].y + Math.floor((-15000 + Math.random() * 30000))
			// TODO: not create if too close to player
			let nearAsteroids = 0
			for (unitID in global.gameObjects.units) {
				if (global.gameObjects.units[unitID].isAsteroid) {
					const length = Math.sqrt(x * x + global.gameObjects.units[unitID].y * global.gameObjects.units[unitID].y);
					if (length <= 15000) {
						nearAsteroids++
					}
				}
			}

			if (nearAsteroids < 10) {
				const asteroid = UnitsFactory.newAsteroid(x, y)
				asteroid.appearIn(5000)
				
				setTimeout(() => {
					asteroid.vanishIn(20000)
				}, 20000)
				global.gameObjects.units[asteroid.id] = asteroid
				global.gameObjects.newObjects.units[asteroid.id] = asteroid
			}
		}
	}
}

setTimeout(() => {
	setInterval(() => {
		emitGameStateToClients()
	}, 20)
}, 1000)

setTimeout(() => {
	setInterval(() => {
		unitsGenerateEnergy()
	}, 100)
}, 1000)

setTimeout(() => {
	setInterval(() => {
		spawnAsteroids()
	}, 1000)
}, 1000)
