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
					if (JSON.stringify(lastSendedObj[currentID][sendedProperty]) == JSON.stringify(globalObjClientVariables[sendedProperty])) {
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

		global.io.emit('init', {
			units: newUnits,
			projetils: newProjetils,
		})

		global.gameObjects.newObjects.units = {}
		global.gameObjects.newObjects.projetils = {}
	}

	global.io.emit('update', {
		units: keepOnlyChanges(units, newUnits, global.gameObjects.units),
		projetils: keepOnlyChanges(projetils, newProjetils, global.gameObjects.projetils)
	})

	const removeUnits = global.gameObjects.removeObjects.units
	const removeProjetils = global.gameObjects.removeObjects.projetils
	if (removeUnits.length > 0 || removeProjetils.length > 0) {

		global.io.emit('remove', {
			units: removeUnits,
			projetils: removeProjetils,
		})

		global.gameObjects.removeObjects.units = []
		global.gameObjects.removeObjects.projetils = []
	}

	for (id in global.gameObjects.clients) {
		if (global.gameObjects.clients[id].player) {
			const stars = SpawnStars.getNewVisibleQuadrants(global.gameObjects.clients[id].player.unit.x, global.gameObjects.clients[id].player.unit.y, global.gameObjects.clients[id].player.stars, global.gameObjects.clients[id].player.screenResolution)
			if (stars.length > 0) global.gameObjects.clients[id].socket.emit('stars', stars)
		}
	}
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

function spawnMeteors() {
	for (id in global.gameObjects.units) {
		if (global.gameObjects.units[id].isPlayer) {
			const x = global.gameObjects.units[id].x + Math.floor((-25000 + Math.random() * 50000))
			const y = global.gameObjects.units[id].y + Math.floor((-15000 + Math.random() * 30000))
			let nearMeteors = 0
			for (unitID in global.gameObjects.units) {
				if (global.gameObjects.units[unitID].isMeteor) {
					const length = Math.sqrt(x * x + global.gameObjects.units[unitID].y * global.gameObjects.units[unitID].y);
					if (length <= 15000) {
						nearMeteors++
					}
				}
			}

			if (nearMeteors < 10) {
				const meteor = UnitsFactory.newMeteor(x, y)
				meteor.appearIn(10000)
				
				setTimeout(() => {
					meteor.vanishIn(15000)
				}, 45000)
				global.gameObjects.units[meteor.id] = meteor
				global.gameObjects.newObjects.units[meteor.id] = meteor
			}
		}
	}
}

setTimeout(() => {
	setInterval(() => {
		emitGameStateToClients()
	}, 50)
}, 1000)

setTimeout(() => {
	setInterval(() => {
		unitsGenerateEnergy()
	}, 100)
}, 1000)

setTimeout(() => {
	setInterval(() => {
		spawnMeteors()
	}, 1000)
}, 1000)
