const PlayerFactory = require('../models/Player')
const BulletFactory = require('../models/Bullet')

module.exports = function (client) {


	client.socket.on('disconnect', () => {
		console.log('-Client disconnected')
		client.online = false
	})

	// player logged in

	client.socket.on('playerReady', clientData => {
		//console.log('*Player Ready');
		let clients = global.gameObjects.clients
		let playerFound = false
		for (let index = 0; index < clients.length; index++) {
			if (clients[index].player) {
				if (clients[index].player.username == clientData.username && clients[index].player.password == clientData.password) {
					playerFound = true
					client.player = clients[index].player
					client.online = true
					client.socket.emit('player', client.player)
					break
				}
			}
		}
        
		if (!playerFound) {
			let player = PlayerFactory.newPlayer(clientData.username, clientData.password)
			client.player = player
			client.player.screenResolution = {w: clientData.screenResolution.w * 15, h: clientData.screenResolution.h * 15}
			client.online = true
			global.gameObjects.ships.push(player.ship)
			client.socket.emit('player', client.player)
		}
	})

	// update ships state

	client.socket.on('ships', (data, callback) => {
		callback(global.gameObjects.ships)
	})

	// angle
	client.socket.on('playerAngle', angle => {
		if (client.player) {
			if (client.player.ship.shooting) client.player.ship.angle = angle			
		}
	})

	// attack

	client.socket.on('playerFires', (data, callback) => {
		if (client.player) {
			const ship = client.player.ship
			if (ship.state != 'dead' && ship.state != 'removible') {

				if (!ship.shooting) {
					ship.angle = data.angle
					ship.shooting = true;
				(function shootLoop() {
					setTimeout(() => {
						if (ship.shooting == true && ship.state != 'dead' && ship.state != 'removible') {
							ship.weapons[ship.currentWeaponIndex].shoot(ship)
							setTimeout(() => {
								shootLoop()
							}, ship.weapons[ship.currentWeaponIndex].cooldawn)
						}
					}, ship.weapons[ship.currentWeaponIndex].canalizeTime)
				})()
				}
			}
			callback()
		}
	})

	client.socket.on('playerStopFires', () => {
		if (client.player) {
			client.player.ship.shooting = false
		}
	})

	// movement

	client.socket.on('playerKeyPress_w', () => {
		if (client.player) {
			client.player.ship.engineOn = true
			client.player.ship.pressingW = true
		}
	})
	client.socket.on('playerKeyRelease_w', () => {
		if (client.player) {
			client.player.ship.pressingW = false
			client.player.ship.engineOn = false
		}
	})

	client.socket.on('playerKeyPress_s', () => {
		if (client.player) {
			client.player.ship.pressingS = true
		}
	})
	client.socket.on('playerKeyRelease_s', () => {
		if (client.player) {
			client.player.ship.pressingS = false
		}
	})


	client.socket.on('playerKeyPress_a', () => {
		if (client.player) {
			client.player.ship.pressingA = true
		}
	})
	client.socket.on('playerKeyRelease_a', () => {
		if (client.player) {
			client.player.ship.pressingA = false
		}
	})

	client.socket.on('playerKeyPress_d', () => {
		if (client.player) {
			client.player.ship.pressingD = true
		}
	})
	client.socket.on('playerKeyRelease_d', () => {
		if (client.player) {
			client.player.ship.pressingD = false
		}
	})

	
}