
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

		for (id in global.gameObjects.projetils) {
			global.gameObjects.projetils[id].move()
		}

		for (id in global.gameObjects.projetils) {
			if (global.gameObjects.projetils[id].state == 'removible') {
				global.gameObjects.removeObjects.projetils.push(id)
				delete global.gameObjects.projetils[id]
			}
		}
	}, intervalMS)
}, 0)