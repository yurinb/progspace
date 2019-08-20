const spawnStars = require('./spawn-stars')
const collideObjects = require('./collide-objects')

const intervalMS = 30

function moveProjetils(element) {
	if (element.state != 'removible') {

		const collided = collideObjects.elementCollidesWithShip(element, shipCollided => {
			if (shipCollided.state != 'dead' && shipCollided.state != 'removible') {
				element.x = shipCollided.x
				element.y = shipCollided.y

				elemDies(element)
				shipCollided.energy -= element.damage
				if (shipCollided.energy <= 0) {
					elemDies(shipCollided)
				}
			}
		})

		if (!collided) {
			if (element.speed > 0) {
				element.x += (element.speed + element.shipAcelerated) * Math.cos(element.angle * Math.PI / 180)
				element.y += (element.speed + element.shipAcelerated) * Math.sin(element.angle * Math.PI / 180)
			}
		}
		
	}
	if (element.lifeTime > 0) {
		element.lifeTime -= intervalMS
	}
}

function moveShips(element) {
	if (element.state == 'dead') {
		if (element.animation.state != 'dead') elemDies(element)
		return
	}

	if (element.acelerated <= element.speed) {
		element.acelerated += element.aceleration * 0.1
	}

	if (element.propulsor.on) {
		let maxAcceleration = 10
		if (element.acelerated <= element.speed * maxAcceleration) {
			element.acelerated += element.aceleration * 0.1 * 1.5
		}
	}

	let velY = 0;
	let velX = 0;

	if (element.pressingW) velY = -1
	if (element.pressingS) velY = 1

	if (element.pressingA) velX = -1
	if (element.pressingD) velX = 1

	const length = Math.sqrt(velX * velX + velY * velY);

	if (length != 0) {
		velX /= length;
		velY /= length;
		
		velX *= element.acelerated
		velY *= element.acelerated
		
		if (!element.shooting) {
			let angle = Math.atan2(element.y - (element.y += velY), element.x - (element.x += velX)) * 180 / Math.PI
			angle += 180
			if (angle < 0) {
				angle += 360
			}
			element.propulsor.on = true
			element.angle = angle
		} else {
			element.propulsor.on = false
		}
		element.x += velX
		element.y += velY
	} else {
		element.propulsor.on = false
	}

	
}

function elemDies(elem) {
	elem.state = 'dead'
	elem.animation = elem.animations.dead
	setTimeout(() => {
		elem.state = 'removible'
	}, elem.animation.interval * elem.animation.frames.length)
}

// emit ships position

setTimeout(() => {
	setInterval(function shipsMove() {
		global.gameObjects.ships.forEach(element => {
			moveShips(element)
		})
		global.gameObjects.ships = global.gameObjects.ships.filter( ship => ship.state != 'removible')
		global.io.emit('ships_position', global.gameObjects.ships.map( ship => ({username: ship.username, x: ship.x, y: ship.y, angle: ship.angle})))
	}, intervalMS)
}, 0)


// emit projetils
let sendEmptyProjetilsCount = false
setTimeout(() => {
	setInterval(function projetilsMove() {
		global.gameObjects.bullets.forEach(element => {
			if (element.lifeTime <= 0 && element.state == 'idle') {
				elemDies(element)
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
		if (updatedBullets.length > 0) {
			global.io.emit('bullets', updatedBullets)
			if (sendEmptyProjetilsCount) sendEmptyProjetilsCount = false
		} else {
			if (!sendEmptyProjetilsCount) {
				global.io.emit('bullets', updatedBullets)
				sendEmptyProjetilsCount = true
			}
		}
	}, intervalMS)
}, 10)

// emit stars

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