const spawnStars = require('./spawn-stars')
const collideObjects = require('./collide-objects')

const intervalMS = 30

function moveBullet(element) {
	if (element.state != 'removible') {
		collideObjects.elementCollidesWithShip(element, shipCollided => {
			bulletDies(element)
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
	if (element.engineOn) {
		if (element.acelerated <= element.speed) {
			element.acelerated += element.aceleration * 0.1
		}
		if (element.propulsor.on) {
			let energyCost = element.maxEnergy * 0.01 * 0.25
			if (element.energy >= energyCost) {
				element.energy -= energyCost
				let maxAcceleration = 10
				if (element.acelerated <= element.speed * maxAcceleration) {
					element.acelerated += element.aceleration * 0.1 * 1.5
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

	element.x += element.acelerated * Math.cos(element.angle * Math.PI / 180)
	element.y += element.acelerated * Math.sin(element.angle * Math.PI / 180)
	if (element.state == 'dead') {
		shipDies(element)
	}
}

function shipDies(elem) {
	// TODO: dies method
}

function bulletDies(elem) {
	elem.state = 'dead'
}


setTimeout(() => {
	setInterval(function shipsMove() {
		global.gameObjects.ships.slice().forEach(element => {
			moveShips(element)
		})
		global.io.emit('ships_position', global.gameObjects.ships.map( ship => ({username: ship.username, x: ship.x, y: ship.y, angle: ship.angle})))
	}, intervalMS)
}, 0)

setTimeout(() => {
	setInterval(function bulletMove() {
		let index = 0
		let indexesToRemove = []
		global.gameObjects.bullets.slice().forEach(element => {
			if (element.lifeTime <= 0 && element.state == 'idle') {
				bulletDies(element)
			}
			if (element.state == 'removible') {
				indexesToRemove.push(index)
			}
			if (element.lifeTime > 0 && element.state == 'idle') {
				moveBullet(element)
			}
			index++
		})
		let updatedBullets = global.gameObjects.bullets.filter((value, index) => {
			indexesToRemove.slice().forEach(i => {
				if (i == index) {
					return false
				}
			})
			return true
		})
		global.gameObjects.bullets = updatedBullets
		const bullets = global.gameObjects.bullets
		if (bullets.length > 0) global.io.emit('bullets', bullets)
	}, intervalMS)
}, 10)

setTimeout(() => {
	setInterval(() => {
		global.gameObjects.clients.slice().forEach(elem => {
			if (elem.player) {
				const stars = spawnStars.getNewVisibleQuadrants(elem.player.ship.x, elem.player.ship.y, elem.player.stars, elem.player.screenResolution)
				if (stars.length > 0) elem.socket.emit('stars', stars)
			}
		})
	}, intervalMS)
}, 20)