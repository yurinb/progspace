const spawnStars = require('./spawn-stars')
const collideObjects = require('./collide-objects')

const intervalMS = 30

// Units
setTimeout(() => {
	setInterval(() => {
		global.gameObjects.units.forEach(element => {
			if (element.isPlayer) moveUnits(element)
			if (element.isMeteor) moveMeteors(element)
		})
		global.gameObjects.units = global.gameObjects.units.filter( unit => unit.state != 'removible')
		global.io.emit('units_position', global.gameObjects.units.map( unit => ({id: unit.id, animation: unit.animation, x: unit.x, y: unit.y, angle: unit.angle})))
	}, intervalMS)
}, 0)

// Projetils
let sendEmptyProjetilsCount = false
setTimeout(() => {
	setInterval(() => {
		global.gameObjects.projetils.forEach(element => {
			if (element.lifeTime <= 0 && element.state == 'idle') {
				element.dies()
			}
			
			if (element.lifeTime > 0 && element.state == 'idle') {
				moveProjetils(element)
			}
		})
		let updatedProjetils = global.gameObjects.projetils.filter((projetil) => {
			if (projetil.state == 'removible') {
				return false
			}
			return true
		})
		global.gameObjects.projetils = updatedProjetils
		if (updatedProjetils.length > 0) {
			global.io.emit('projetils', updatedProjetils)
			if (sendEmptyProjetilsCount) sendEmptyProjetilsCount = false
		} else {
			if (!sendEmptyProjetilsCount) {
				global.io.emit('projetils', updatedProjetils)
				sendEmptyProjetilsCount = true
			}
		}
	}, intervalMS)
}, 10)

// Stars
setTimeout(() => {
	setInterval(() => {
		global.gameObjects.clients.forEach(elem => {
			if (elem.player) {
				const stars = spawnStars.getNewVisibleQuadrants(elem.player.unit.x, elem.player.unit.y, elem.player.stars, elem.player.screenResolution)
				if (stars.length > 0) elem.socket.emit('stars', stars)
			}
		})
	}, intervalMS)
}, 20)

function moveProjetils(element) {
	if (element.state != 'removible') {

		const collided = collideObjects.elementCollidesWithShip(element, unitCollided => {
			if (unitCollided.state != 'dead' && unitCollided.state != 'removible') {
				element.dies()
				unitCollided.energy -= element.damage
				if (unitCollided.energy <= 0) {
					unitCollided.dies()
				}
			}
		})

		if (!collided) {
			if (element.speed > 0) {
				element.x += (element.speed + element.unitAcelerated) * Math.cos(element.angle * Math.PI / 180)
				element.y += (element.speed + element.unitAcelerated) * Math.sin(element.angle * Math.PI / 180)
			}
		}
		
	}
	if (element.lifeTime > 0) {
		element.lifeTime -= intervalMS
	}
}

function moveUnits(element) {
	if (element.state == 'dead') return

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

function moveMeteors(element) {
	if (element.state == 'dead') return

	const collided = collideObjects.elementCollidesWithShip(element, unitCollided => {
		if (unitCollided.state != 'dead' && unitCollided.state != 'removible') {
			unitCollided.dies()
			if (unitCollided.isMeteor) {
				element.dies()
			}
		}
	})

	if (!collided) {
		element.x += element.speed * Math.cos(element.angle * Math.PI / 180)
		element.y += element.speed * Math.sin(element.angle * Math.PI / 180)
	}
}