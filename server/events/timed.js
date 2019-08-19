setTimeout(() => {
	setInterval(() => {
		shipsGenerateEnergy()
	}, 50)
}, 1000)

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