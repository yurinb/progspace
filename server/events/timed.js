const UnitsFactory = require('../models/Units')


function shipsGenerateEnergy() {
	for (let i = 0; i < global.gameObjects.clients.length; i++) {
		let player = global.gameObjects.clients[i].player
		if (player) {
			if (player.ship.energy < player.ship.maxEnergy) {
				player.ship.energy += player.ship.reactorSpeed
				if (player.ship.energy > player.ship.maxEnergy) {
					player.ship.energy = player.ship.maxEnergy
				}
			}
		}
	}
}

function spawnMeteors() {
	global.gameObjects.ships.forEach(element => {
		const meteor = UnitsFactory.newMeteor(element.x + (-25000 + Math.random() * 25000), element.y + (-15000 + Math.random() * 15000))
		setTimeout(() => {
			meteor.vanishIn(10000)
		}, 60000)
		if (element.isPlayer) global.gameObjects.ships.push(meteor)
	});
}

setTimeout(() => {
	setInterval(() => {
		shipsGenerateEnergy()
	}, 100)
}, 1000)

setTimeout(() => {
	setInterval(() => {
		spawnMeteors()
	}, 5000)
}, 1000)