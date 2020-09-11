const primaryColor = '#42f4c5'

const images = {}

loadImages()

function drawObjects() {
	drawInterface()
	drawAnimatedObjectsLoop()
}

let previousFrameTime = 0
let FPS = 0

function drawAnimatedObjectsLoop(time) {
	// FPS = Math.floor(1000/(time - previousFrameTime))
	// previousFrameTime = time

	drawStars()
	drawUnits()
	drawProjetils()
	// drawFPS(FPS)

	requestAnimationFrame(drawAnimatedObjectsLoop) // loops every 17ms (+-) (60fps)
	// setTimeout(() => {
	// 	drawAnimatedObjectsLoop()
	// }, 50);
}

function drawFPS(FPS) {
	interfaceC.clearRect(0, 0, 30, 30)
	interfaceC.textAlign = 'center'
	interfaceC.fillStyle = primaryColor
	interfaceC.fillText(FPS + ' fps', 25 , 25)
}

function drawStars() {
		if (!isEmpty(player)) {
			backgroundC.clearRect(0, 0, screenWidth, screenHeight)
			// let renderedStars = 0
			// let total = 0
			player.stars.forEach(elem => {
				// total+=elem.stars.length
				elem.stars.forEach(ele => {
					let r = 0.75 + Math.random() * 1
					let screenPosition = convertPosToPixel(ele.x, ele.y, player.unit, ele.z)
					// is star on screen?
					if (screenPosition.x <= screenWidth && screenPosition.y <= screenHeight) {
						// renderedStars++
						let z = r > 1 ? ele.z * r : ele.z
						// backgroundC.shadowOffsetX = 0;
						// backgroundC.shadowOffsetY = 0;
						// backgroundC.shadowBlur = 10;
						// backgroundC.shadowColor = "rgba(" + ele.r + ", " + ele.g + ", " + ele.b + ", " + z + ")"
						backgroundC.fillStyle = 'rgba(' + ele.r + ', ' + ele.g + ', ' + ele.b + ', ' + z + ')'
						backgroundC.fillRect(screenPosition.x, screenPosition.y, ele.s, ele.s)
					}
				})
			})
			// console.log({renderedStars, of: total});
		}
}

function drawUnits() {
		if (units.length > 0 && !isEmpty(player)) {
			unitsC.clearRect(0, 0, screenWidth, screenHeight)
			
			const otherUnits = []
			
			units.forEach(elem => {
				if (!elem.isAsteroid) {
					otherUnits.push(elem)
					return
				}
				let screenPosition = convertPosToPixel(elem.x, elem.y, player.unit)
				let unitFrame = getImgFrameByIndex(elem)
				
				unitsC.save()
				unitsC.translate(screenPosition.x, screenPosition.y)
				unitsC.rotate(elem.a * Math.PI / 180)
				try {
					unitsC.drawImage(unitFrame, -(elem.w * 2 * zoom / 2), -(elem.h * 2 * zoom / 2), elem.w * 2 * zoom, elem.h * 2 * zoom)
				} catch (error) {
					console.log({error})
				}
				unitsC.restore()
			})
			
			otherUnits.forEach(elem => {
				// player ship
				if (elem.id == player.unit.id) {
					player.unit = elem
				}
				let screenPosition = convertPosToPixel(elem.x, elem.y, player.unit)

				// unit
				let unitFrame = getImgFrameByIndex(elem)
				unitsC.save()
				unitsC.translate(screenPosition.x, screenPosition.y)
				unitsC.rotate(elem.a * Math.PI / 180)
				try {
					unitsC.drawImage(unitFrame, -(elem.w * 2 * zoom / 2), -(elem.h * 2 * zoom / 2), elem.w * 2 * zoom, elem.h * 2 * zoom)
				} catch (error) {}
				unitsC.restore()

				// username
				if (elem.username)
					drawUsernameAboveShip(unitsC, elem)

				// propulsor
				if (elem.propulsor && elem.propulsor.on) {
					let propulsorFrame = getImgFrameByIndex(elem.propulsor)
					let newX = screenPosition.x - 160 * zoom * Math.cos((elem.a + 0) * Math.PI / 180)
					let newY = screenPosition.y - 160 * zoom * Math.sin((elem.a + 0) * Math.PI / 180)
					unitsC.save()
					unitsC.translate(newX, newY)
					unitsC.rotate(elem.a * Math.PI / 180)
					try {
						unitsC.drawImage(propulsorFrame, -(elem.w * 2 * zoom / 2), -(elem.h * 2 * zoom / 2), elem.w * 2 * zoom, elem.h * 2 * zoom)
					} catch (error) {}
					unitsC.restore()
				}
			})
		} else {
			unitsC.clearRect(0, 0, screenWidth, screenHeight)
		}
}

function drawProjetils() {
		if (!isEmpty(player) && !isEmpty(projectiles)) {
			projectilesC.clearRect(0, 0, screenWidth, screenHeight)
			Object.keys(projectiles).forEach(key => {
				const elem = projectiles[key];
				let projectileImg = getImgFrameByIndex(elem)
				let screenPosition = convertPosToPixel(elem.x, elem.y, player.unit)
				projectilesC.save()
				projectilesC.beginPath()
				projectilesC.translate(screenPosition.x, screenPosition.y)
				projectilesC.rotate(elem.a * Math.PI / 180)
				try {
					projectilesC.drawImage(projectileImg, -(elem.w * 2 * zoom / 2), -(elem.h * 2 * zoom / 2), elem.w * 2 * zoom, elem.h * 2 * zoom)
				} catch (error) {
					console.log({ error })
				}
				projectilesC.restore()

				// printOnScreen(`x: ${elem.w} y: ${elem.h}`, elem.x, elem.y, projectilesC)

				// DRAW TRAIL

				if (elem.name != 'plasma') return
				
				if (!elem.trail) {
					elem.trail = {
						starts: {
							x: elem.x, 
							y: elem.y
						},
						ends: {
							x: elem.x,
							y: elem.y
						}
					}
				}
				
				if (elem.state != 'dead') {
					elem.trail.ends = {
						x: elem.x,
						y: elem.y
					}
				} 

				const trail = {
					starts: convertPosToPixel(elem.trail.starts.x, elem.trail.starts.y, player.unit),
					ends: convertPosToPixel(elem.trail.ends.x, elem.trail.ends.y, player.unit),
				}

				projectilesC.save()
				projectilesC.beginPath();
				try {
					if (!elem.opacity) {
						elem.opacity = 0
					}
					if ((elem.isVanish || elem.state == 'dead') && elem.opacity < 0.25) {
						elem.opacity += 0.01
					}

					const normalize = (value) => {
						if (value >= 1) return 1.0
						return value
					}

					let grad = projectilesC.createLinearGradient(trail.starts.x, trail.starts.y, trail.ends.x, trail.ends.y);
					grad.addColorStop(0, 'transparent');
					grad.addColorStop(normalize(0 + elem.opacity * 4.0), 'transparent');
					grad.addColorStop(normalize(0.25 + elem.opacity * 3.0), '#980000');
					grad.addColorStop(normalize(0.5 + elem.opacity * 2.0), '#c10000');
					grad.addColorStop(normalize(0.75 + elem.opacity), '#8f0047');
					grad.addColorStop(normalize(1.0), '#ff8585');

					projectilesC.strokeStyle = grad;	
					projectilesC.lineWidth = 2
					
					projectilesC.moveTo(trail.starts.x, trail.starts.y);
					projectilesC.lineTo(trail.ends.x, trail.ends.y);
					projectilesC.stroke();

					grad = projectilesC.createLinearGradient(trail.starts.x, trail.starts.y, trail.ends.x, trail.ends.y);
					grad.addColorStop(0, 'transparent');
					grad.addColorStop(normalize(0 + elem.opacity * 4.0), 'transparent');
					grad.addColorStop(normalize(0.25 + elem.opacity * 3.0), '#9800ff');
					grad.addColorStop(normalize(0.5 + elem.opacity * 2.0), '#c100ff');
					grad.addColorStop(normalize(0.75 + elem.opacity), '#8f00ff');
					grad.addColorStop(normalize(1.0), '#ff85ff');

					projectilesC.strokeStyle = grad;	
					projectilesC.lineWidth = 1
					
					projectilesC.moveTo(trail.starts.x, trail.starts.y);
					projectilesC.lineTo(trail.ends.x, trail.ends.y);
					projectilesC.stroke();
					projectilesC.closePath();       
				} catch (error) {
					console.log({ error })
				}

				projectilesC.restore()
			})
		} else {
			projectilesC.clearRect(0, 0, screenWidth, screenHeight)
		}
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
	}, 150)

}

function drawShipCoords(c) {
	// c.font = "15px Lucida Console, Monaco, monospace'";
	c.textAlign = 'center'
	c.fillStyle = primaryColor
	c.fillText('[ x ' + (player.unit.x | 0) + ' y ' + (player.unit.y | 0) + ' ]', screenWidth / 2, 25)
}

function drawEnergyBar(c) {
	// c.font = '15px Lucida Console, Monaco, monospace'
	c.textAlign = 'center'

	let x = screenWidth / 2
	let y = screenHeight / 2 + screenHeight / 2.25

	c.fillStyle = primaryColor
	c.fillText('[ Energy Shield ]', x, y - 10)
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

function printOnScreen(value, x, y, c) {
	let screenPosition = convertPosToPixel(x, y, player.unit)
	c.save()
	c.beginPath()
	c.font = '12px Lucida Console, Monaco, monospace'
	c.fillStyle = primaryColor
	c.translate((screenPosition.x), screenPosition.y)
	c.textAlign = 'center'
	c.fillText(value, 0, -200 * zoom)
	c.restore()
}

function loadImages() {
	// SHIPS
	for (let i = 1; i <= 6; i++) {
		let unit = new Image()
		unit.src = '../img/units/unit' + i + '.png'
		images['../img/units/unit' + i + '.png'] = unit
	}
	// PROJETILS
	for (let i = 1; i <= 1; i++) {
		let projectile = new Image()
		projectile.src = '../img/projectiles/projectile' + i + '.png'
		projectile.onload = function () {
			projectile.width = 150
			projectile.height = 100
		}
		images['../img/projectiles/projectile' + i + '.png'] = projectile
	}
	// PROPULSOR
	for (let i = 1; i <= 2; i++) {
		let propulsor = new Image()
		propulsor.src = '../img/sfx/propulsor' + i + '.png'
		propulsor.onload = function () {
			propulsor.width = 200
			propulsor.height = 200
		}
		images['../img/sfx/propulsor' + i + '.png'] = propulsor
	}
	// asteroidS
	for (let i = 1; i <= 30; i++) {
		let asteroid = new Image()
		asteroid.src = '../img/asteroid/asteroid' + i + '.png'
		images['../img/asteroid/asteroid' + i + '.png'] = asteroid
	}
	// EXPLOSION
	for (let i = 1; i <= 13; i++) {
		let explosion = new Image()
		explosion.src = '../img/sfx/explosion' + i + '.png'
		explosion.onload = function () {
			explosion.width = 500
			explosion.height = 500
		}
		images['../img/sfx/explosion' + i + '.png'] = explosion
	}
}

function getImgFrameByIndex(elem) {
	return images[elem.animations[elem.ai] + [elem.fi] + '.png']
	// for (let index = 0; index < images.length; index++) {
	// 	let element = images[index]
	// 	try {
	// 		if (element.src.endsWith(src.substring(3))) {
	// 			return element
	// 		}
	// 	} catch (error) {
	// 		return error
	// 	}
	// }
}