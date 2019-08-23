const UnitsFactory = require('../models/Units')


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
	global.gameObjects.units.forEach(element => {
		if (element.isPlayer) {
			const meteor = UnitsFactory.newMeteor(element.x + (-25000 + Math.random() * 25000), element.y + (-15000 + Math.random() * 15000))
			meteor.appearIn(10000)
		
			setTimeout(() => {
				meteor.vanishIn(10000)
			}, 60000)
		
			global.gameObjects.units.push(meteor)
		}
	});
}

setTimeout(() => {
	setInterval(() => {
		unitsGenerateEnergy()
	}, 100)
}, 1000)

setTimeout(() => {
	setInterval(() => {
		spawnMeteors()
	}, 5000)
}, 1000)