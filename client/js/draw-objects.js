const primaryColor = '#42f4c5'

const images = []

loadImages()

function writeObjects() {
	setTimeout(() => {
		drawStars()
	}, 0)
	setTimeout(() => {
		drawMeteors()
	}, 7.5)
	setTimeout(() => {
		drawUnits()
	}, 15)
	setTimeout(() => {
		drawProjetils()
	}, 22.5)
	setTimeout(() => {
		drawInterface()
	}, 30)
}

function drawStars() {
	setInterval(() => {
		if (!isEmpty(player)) {
			backgroundC.clearRect(0, 0, screenWidth, screenHeight)
			player.stars.forEach(elem => {
				elem.stars.forEach(ele => {
					let r = 0.75 + Math.random() * 1
					let screenPosition = convertPosToPixel(ele.x, ele.y, player.unit, ele.z)
					// is star on screen?
					if (true || screenPosition.x <= screenWidth && screenPosition.y <= screenHeight) {
						let z = r > 1 ? ele.z * r : ele.z
						// backgroundC.shadowOffsetX = 0;
						// backgroundC.shadowOffsetY = 0;
						// backgroundC.shadowBlur = 4;
						// backgroundC.shadowColor = "rgba(" + ele.r + ", " + ele.g + ", " + ele.b + ", " + z + ")"
						backgroundC.fillStyle = 'rgba(' + ele.r + ', ' + ele.g + ', ' + ele.b + ', ' + z + ')'
						backgroundC.fillRect(screenPosition.x, screenPosition.y, ele.s, ele.s)
					}
				})
			})
		}
	}, 30)
}

function drawMeteors() {
	setInterval(() => {
		if (units.length > 0 && !isEmpty(player)) {
			meteorsC.clearRect(0, 0, screenWidth, screenHeight)
			units.filter(el => el.isMeteor).forEach(elem => {

				if (elem.id == player.unit.id) {
					player.unit = elem
				}

				let screenPosition = convertPosToPixel(elem.x, elem.y, player.unit)
				let unitFrame = getImgBySrc(elem.animation.frame)
				meteorsC.save()
				meteorsC.translate(screenPosition.x, screenPosition.y)
				meteorsC.rotate(elem.angle * Math.PI / 180)
				try {
					meteorsC.drawImage(unitFrame, -(elem.w * 2 * zoom / 2), -(elem.h * 2 * zoom / 2), elem.w * 2 * zoom, elem.h * 2 * zoom)
				} catch (error) {}
				meteorsC.restore()
			})
		} else {
			meteorsC.clearRect(0, 0, screenWidth, screenHeight)
		}
	}, 30)
}

function drawUnits() {
	setInterval(() => {
		if (units.length > 0 && !isEmpty(player)) {
			unitsC.clearRect(0, 0, screenWidth, screenHeight)
			units.filter(el => !el.isMeteor).forEach(elem => {

				if (elem.id == player.unit.id) {
					player.unit = elem
				}
				let screenPosition = convertPosToPixel(elem.x, elem.y, player.unit)

				// unit
				let unitFrame = getImgBySrc(elem.animation.frame)
				unitsC.save()
				unitsC.translate(screenPosition.x, screenPosition.y)
				unitsC.rotate(elem.angle * Math.PI / 180)
				try {
					unitsC.drawImage(unitFrame, -(elem.w * 2 * zoom / 2), -(elem.h * 2 * zoom / 2), elem.w * 2 * zoom, elem.h * 2 * zoom)
				} catch (error) {}
				unitsC.restore()

				// username
				drawUsernameAboveShip(unitsC, elem)

				// propulsor
				let propulsorFrame = getImgBySrc(elem.propulsor.animation.frame)
				if (elem.propulsor.on && elem.state != 'dead') {
					let newX = screenPosition.x - 160 * zoom * Math.cos((elem.angle + 0) * Math.PI / 180)
					let newY = screenPosition.y - 160 * zoom * Math.sin((elem.angle + 0) * Math.PI / 180)
					unitsC.save()
					unitsC.translate(newX, newY)
					unitsC.rotate(elem.angle * Math.PI / 180)
					try {
						unitsC.drawImage(propulsorFrame, -(elem.w * 2 * zoom / 2), -(elem.h * 2 * zoom / 2), elem.w * 2 * zoom, elem.h * 2 * zoom)
					} catch (error) {}
					unitsC.restore()
				}
			})
		} else {
			unitsC.clearRect(0, 0, screenWidth, screenHeight)
		}
	}, 30)
}

function drawProjetils() {
	setInterval(() => {
		if (!isEmpty(player) && !isEmpty(projetils)) {
			projetilsC.clearRect(0, 0, screenWidth, screenHeight)
			projetils.forEach(elem => {
				let projetilImg = getImgBySrc(elem.animation.frame)
				projetilsC.save()
				projetilsC.beginPath()
				let screenPosition = convertPosToPixel(elem.x, elem.y, player.unit)
				projetilsC.translate(screenPosition.x, screenPosition.y)
				projetilsC.rotate(elem.angle * Math.PI / 180)
				try {
					projetilsC.drawImage(projetilImg, -(projetilImg.width * zoom / 2), -(projetilImg.height * zoom / 2), projetilImg.width * zoom, projetilImg.height * zoom)
				} catch (error) {}
				projetilsC.restore()
			})
		} else {
			projetilsC.clearRect(0, 0, screenWidth, screenHeight)
		}
	}, 30)

}

function drawInterface() {
	setInterval(() => {
		if (!isEmpty(player)) {
			interfaceC.clearRect(0, 0, screenWidth, screenHeight)
			interfaceC.save()
			interfaceC.beginPath()

			drawShipCoords(interfaceC)

			drawEnergyBar(interfaceC)

			interfaceC.fill()
			interfaceC.restore()
		} else {
			interfaceC.clearRect(0, 0, screenWidth, screenHeight)
		}
	}, 100)

}

function drawShipCoords(c) {
	// c.font = "15px Lucida Console, Monaco, monospace'";
	c.textAlign = 'center'
	c.fillStyle = primaryColor
	c.fillText('x ' + (player.unit.x | 0) + ' y ' + (player.unit.y | 0), screenWidth / 2, 25)
}

function drawEnergyBar(c) {
	// c.font = '15px Lucida Console, Monaco, monospace'
	c.textAlign = 'center'

	let x = screenWidth / 2
	let y = screenHeight / 2 + screenHeight / 2.25

	c.fillStyle = primaryColor
	c.fillText('[energy shield]', x, y - 10)
	let energyBarSize = screenWidth / 4


	// background energy bar
	c.strokeStyle = primaryColor
	c.strokeRect(x - energyBarSize / 2, y, energyBarSize, 10)

	// current state energy bar
	c.fillStyle = primaryColor
	c.fillRect(x - energyBarSize / 2, y, energyBarSize * player.unit.energy / player.unit.maxEnergy, 10)
}

function drawUsernameAboveShip(c, unit) {
	let screenPosition = convertPosToPixel(unit.x, unit.y, player.unit)
	c.save()
	c.beginPath()
	c.font = '12px Lucida Console, Monaco, monospace'
	c.fillStyle = primaryColor
	c.translate((screenPosition.x), screenPosition.y)
	c.textAlign = 'center'
	c.fillText(unit.username, 0, -200 * zoom)
	c.restore()

	// debugger on screen:
	if (debbugingOnScreen) {
		c.save()
		c.beginPath()
		c.font = '12px Lucida Console, Monaco, monospace'
		c.fillStyle = primaryColor
		c.translate((screenPosition.x), screenPosition.y)
		c.textAlign = 'center'
		c.fillText(debbugingOnScreen, 0, -400 * zoom)
		c.restore()
	}
}

function loadImages() {
	// SHIPS
	for (let i = 1; i <= 6; i++) {
		let unit = new Image()
		unit.src = '../img/units/unit' + i + '.png'
		images.push(unit)
	}
	// PROJETILS
	for (let i = 1; i <= 1; i++) {
		let projetil = new Image()
		projetil.src = '../img/projetils/projetil' + i + '.png'
		projetil.onload = function () {
			projetil.width = 150
			projetil.height = 100
		}
		images.push(projetil)
	}
	// PROPULSOR
	for (let i = 1; i <= 2; i++) {
		let propulsor = new Image()
		propulsor.src = '../img/sfx/propulsor' + i + '.png'
		propulsor.onload = function () {
			propulsor.width = 200
			propulsor.height = 200
		}
		images.push(propulsor)
	}
	// METEORS
	for (let i = 1; i <= 30; i++) {
		let meteor = new Image()
		meteor.src = '../img/meteor/meteor' + i + '.png'
		images.push(meteor)
	}
	// EXPLOSION
	for (let i = 1; i <= 13; i++) {
		let explosion = new Image()
		explosion.src = '../img/sfx/explosion' + i + '.png'
		explosion.onload = function () {
			explosion.width = 500
			explosion.height = 500
		}
		images.push(explosion)
	}
}

function getImgBySrc(src) {
	for (let index = 0; index < images.length; index++) {
		let element = images[index]
		try {
			if (element.src.endsWith(src.substring(3))) {
				return element
			}
		} catch (error) {
			return error
		}
	}
}