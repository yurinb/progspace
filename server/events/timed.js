const UnitsFactory = require('../models/Units')
const SpawnStars = require('../actions/spawn-stars')

let units = {}
let projetils = {}


function keepOnlyChanges(lastSendedObj, initObj, globalObj) {
	for (id in initObj) {
		lastSendedObj[id] = JSON.parse(JSON.stringify(initObj[id]))
	}
	let newSendObj = JSON.parse(JSON.stringify(lastSendedObj))
	for (lastID in lastSendedObj) {
		if (!globalObj[lastID]) {
			delete lastSendedObj[lastID]
		}
	}
	
	for (currentID in globalObj) {
		let globalObjClientVariables = JSON.parse(JSON.stringify(globalObj[currentID].getClientVariables()))
		if (lastSendedObj[currentID]) {
			for (sendedProperty in lastSendedObj[currentID]) {
				if (lastSendedObj[currentID][sendedProperty]) {
					if (JSON.stringify(lastSendedObj[currentID][sendedProperty]) === JSON.stringify(globalObjClientVariables[sendedProperty])) {
						// delete newSendObj[currentID][sendedProperty]
						newSendObj[currentID][sendedProperty] = undefined
					} else {
						newSendObj[currentID][sendedProperty] = JSON.parse(JSON.stringify(globalObjClientVariables[sendedProperty]))
						lastSendedObj[currentID][sendedProperty] = JSON.parse(JSON.stringify(globalObjClientVariables[sendedProperty]))
					}
				} else {
					newSendObj[currentID][sendedProperty] = JSON.parse(JSON.stringify(globalObjClientVariables[sendedProperty]))
					lastSendedObj[currentID][sendedProperty] = JSON.parse(JSON.stringify(globalObjClientVariables[sendedProperty]))
				}
			}
		} else {
			lastSendedObj[currentID] = JSON.parse(JSON.stringify(globalObjClientVariables))
			newSendObj[currentID] = JSON.parse(JSON.stringify(globalObjClientVariables))
		}
	}

	return newSendObj
}

function emitGameStateToClients() {
	
	const newUnits = {}
	for (id in global.gameObjects.newObjects.units) {
		newUnits[id] = global.gameObjects.newObjects.units[id].getClientVariables()
	}
	const newProjetils = {}
	for (id in global.gameObjects.newObjects.projetils) {
		newProjetils[id] = global.gameObjects.newObjects.projetils[id].getClientVariables()
	}
	if (Object.keys(newUnits).length > 0 || Object.keys(newProjetils).length > 0) {
		setTimeout(() => {
			global.io.compress(true).emit('init', global.encode({
				units: newUnits,
				projetils: newProjetils,
			}))
		}, 10)
			
		global.gameObjects.newObjects.units = {}
		global.gameObjects.newObjects.projetils = {}
	}

	setTimeout(() => {
		global.io.compress(true).emit('update', global.encode({
			units: keepOnlyChanges(units, newUnits, global.gameObjects.units),
			projetils: keepOnlyChanges(projetils, newProjetils, global.gameObjects.projetils)
		}))
	}, 15)

	const removeUnits = global.gameObjects.removeObjects.units
	const removeProjetils = global.gameObjects.removeObjects.projetils
	if (removeUnits.length > 0 || removeProjetils.length > 0) {
		setTimeout(() => {
			global.io.compress(true).emit('remove', global.encode({
				units: removeUnits,
				projetils: removeProjetils,
			}))
		}, 20)
			
		global.gameObjects.removeObjects.units = []
		global.gameObjects.removeObjects.projetils = []
	}
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
				asteroid.appearIn(7500)
				
				setTimeout(() => {
					asteroid.vanishIn(15000)
				}, 25000)
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
