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
		if (element.isPlayer) global.gameObjects.ships.push(UnitsFactory.newMeteor(element.x + (-10000 + Math.random() * 10000), element.y + (-10000 + Math.random() * 10000)))
	});
}

setTimeout(() => {
	setInterval(() => {
		shipsGenerateEnergy()
	}, 50)
}, 1000)

setInterval(() => {
	spawnMeteors()
}, 5000)