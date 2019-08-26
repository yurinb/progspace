const PlayerFactory = require('../models/Player')

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
			global.gameObjects.units[player.unit.id] = player.unit
			client.socket.emit('player', client.player)
		}

		global.gameObjects.newObjects.units[client.player.unit.id] = client.player.unit

		const units = {}
		for (id in global.gameObjects.units) {
			units[id] = global.gameObjects.units[id].getClientVariables()
		}
		const projetils = {}
		for (id in global.gameObjects.projetils) {
			projetils[id] = global.gameObjects.projetils[id].getClientVariables()
		}

		client.socket.emit('init', {
			units, projetils
		})
	})

	// angle
	client.socket.on('playerAngle', angle => {
		if (client.player) {
			if (client.player.unit.shooting) client.player.unit.angle = angle			
		}
	})

	// attack

	client.socket.on('playerFires', (data, callback) => {
		if (client.player) {
			const unit = client.player.unit
			if (unit.state == 'alive') {
				if (!unit.shooting) {
					unit.angle = data.angle
					unit.shooting = true;
					(function shootLoop() {
						setTimeout(() => {
							if (unit.shooting == true && unit.state == 'alive') {
								unit.weapons[unit.currentWeaponIndex].shoot(unit)
								setTimeout(() => {
									shootLoop()
								}, unit.weapons[unit.currentWeaponIndex].cooldawn)
							}
						}, unit.weapons[unit.currentWeaponIndex].canalizeTime)
					})()
				}
			}
			callback()
		}
	})

	client.socket.on('playerStopFires', () => {
		if (client.player) {
			client.player.unit.shooting = false
		}
	})

	// movement

	client.socket.on('playerKeyPress_w', () => {
		if (client.player) {
			client.player.unit.engineOn = true
			client.player.unit.pressingW = true
		}
	})
	client.socket.on('playerKeyRelease_w', () => {
		if (client.player) {
			client.player.unit.pressingW = false
			client.player.unit.engineOn = false
		}
	})

	client.socket.on('playerKeyPress_s', () => {
		if (client.player) {
			client.player.unit.pressingS = true
		}
	})
	client.socket.on('playerKeyRelease_s', () => {
		if (client.player) {
			client.player.unit.pressingS = false
		}
	})


	client.socket.on('playerKeyPress_a', () => {
		if (client.player) {
			client.player.unit.pressingA = true
		}
	})
	client.socket.on('playerKeyRelease_a', () => {
		if (client.player) {
			client.player.unit.pressingA = false
		}
	})

	client.socket.on('playerKeyPress_d', () => {
		if (client.player) {
			client.player.unit.pressingD = true
		}
	})
	client.socket.on('playerKeyRelease_d', () => {
		if (client.player) {
			client.player.unit.pressingD = false
		}
	})

	
}