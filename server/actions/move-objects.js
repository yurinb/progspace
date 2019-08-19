const spawnStars = require('./spawn-stars')
const collideObjects = require('./collide-objects')

const intervalMS = 30
const projetilSpawnIntervalMS = 100


function moveProjetils(element) {
	if (element.state != 'removible') {
		collideObjects.elementCollidesWithShip(element, shipCollided => {
			projetilDies(element)
			shipCollided.energy -= element.damage
			if (shipCollided.energy <= 0) {
				shipCollided.state = 'dead'
			}
		})

		if (element.speed > 0) {
			element.x += (element.speed + element.shipAcelerated) * Math.cos(element.angle * Math.PI / 180)
			element.y += (element.speed + element.shipAcelerated) * Math.sin(element.angle * Math.PI / 180)
		}
	}
	if (element.lifeTime > 0) {
		element.lifeTime -= intervalMS
	}
}

function moveShips(element) {
	if (element.engineOn || true) {
		if (element.acelerated <= element.speed) {
			element.acelerated += Math.ceil(element.aceleration * 0.1)
		}
		if (element.propulsor.on) {
			let energyCost = element.maxEnergy * 0.01 * 0.25
			if (element.energy >= energyCost) {
				element.energy -= energyCost
				let maxAcceleration = 10
				if (element.acelerated <= element.speed * maxAcceleration) {
					element.acelerated += Math.ceil(element.aceleration * 0.1 * 1.5)
				}
			} else {
				element.propulsor.on = false
				//element.acelerated /= 3
			}
		}
	} else {
		if (element.acelerated > 0) {
			element.acelerated -= element.aceleration * 0.25
		} else {
			element.acelerated = 0
		}
	}

	let velY = 0;
	let velX = 0;

	// let angle = 0

	if (element.pressingW) velY = -1
	if (element.pressingS) velY = 1

	if (element.pressingA) velX = -1
	if (element.pressingD) velX = 1
	
	// if (element.pressingW && element.pressingA) {
	// 	velY = -0.5
	// 	velX = -0.5
	// }
	// if (element.pressingW && element.pressingD) {
	// 	velY = -0.5
	// 	velX = 0.5
	// }
	// if (element.pressingS && element.pressingA) {
	// 	velY = 0.5
	// 	velX = -0.5
	// }
	// if (element.pressingS && element.pressingD) {
	// 	velY = 0.5
	// 	velX = 0.5
	// }
	// element.x += element.acelerated * Math.cos(element.angle * Math.PI / 180)
	// element.y += element.acelerated * Math.sin(element.angle * Math.PI / 180)
	element.x += element.acelerated * velX
	element.y += element.acelerated * velY
	if (element.state == 'dead') {
		shipDies(element)
	}
}

function shipDies(elem) {
	// TODO: dies method
}

function spawnProjetils() {

}

function projetilDies(elem) {
	elem.state = 'dead'
}


setTimeout(() => {
	setInterval(function shipsMove() {
		global.gameObjects.ships.forEach(element => {
			moveShips(element)
		})
		global.io.emit('ships_position', global.gameObjects.ships.map( ship => ({username: ship.username, x: ship.x, y: ship.y, angle: ship.angle})))
	}, intervalMS)
}, 0)

setTimeout(() => {
	setInterval(function projetilsMove() {
		global.gameObjects.bullets.forEach(element => {
			if (element.lifeTime <= 0 && element.state == 'idle') {
				projetilDies(element)
			}
			
			if (element.lifeTime > 0 && element.state == 'idle') {
				moveProjetils(element)
			}
		})
		let updatedBullets = global.gameObjects.bullets.filter((projetil) => {
			if (projetil.state == 'removible') {
				return false
			}
			return true
		})
		global.gameObjects.bullets = updatedBullets
		if (updatedBullets.length > 0) global.io.emit('bullets', updatedBullets)
	}, intervalMS)
}, 10)

setTimeout(() => {
	setInterval(() => {
		global.gameObjects.clients.forEach(elem => {
			if (elem.player) {
				const stars = spawnStars.getNewVisibleQuadrants(elem.player.ship.x, elem.player.ship.y, elem.player.stars, elem.player.screenResolution)
				if (stars.length > 0) elem.socket.emit('stars', stars)
			}
		})
	}, intervalMS)
}, 20)

// spawn projetils
setTimeout(() => {
	setInterval(() => {
		global.gameObjects.ships.forEach(elem => {
			if (elem.shooting) elem.weapons[elem.currentWeaponIndex].shoot(elem)
		})
	}, projetilSpawnIntervalMS)
}, 25)