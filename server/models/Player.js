const UnitsFactory = require('./Units')

let playerCount = 0

function getPlayerBy(username, password) {
	let playerFound = false
	global.gameObjects.clients.forEach(element => {
		if (!playerFound) {
			let player = element.player
			if (player) {
				if (player.username == username && player.password == password) {
					playerFound = player
				}
			}
		}
	})

    return playerFound
}

module.exports = {


	newPlayer: function (username, password) {
		let playerFound = getPlayerBy(username, password)
		if (playerFound) {
			return playerFound
		} else {
			let player = {
				id: playerCount,
				username,
				password,
				stars: [],
				unit: UnitsFactory.newShip(username)
			}
			playerCount++
			return player
		}
	}


}