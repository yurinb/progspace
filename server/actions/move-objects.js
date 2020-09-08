
const intervalMS = 50

setTimeout(() => {
	setInterval(() => {
		for (id in global.gameObjects.units) {
			global.gameObjects.units[id].move()
		}

		for (id in global.gameObjects.units) {
			if (global.gameObjects.units[id].state == 'removible') {
				global.gameObjects.removeObjects.units.push(id)
				delete global.gameObjects.units[id]
			}
		}

		for (id in global.gameObjects.projectiles) {
		global.gameObjects.projectiles[id].move()
		}

		for (id in global.gameObjects.projectiles) {
			if (global.gameObjects.projectiles[id].state == 'removible') {
				global.gameObjects.removeObjects.projectiles.push(id)
				delete global.gameObjects.projectiles[id]
			}
		}
	}, intervalMS)
}, 0)