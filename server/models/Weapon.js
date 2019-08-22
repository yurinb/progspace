const BulletFactory = require('../models/Bullet')

function newWeapon(username) {
	let weapon = {
		name: '',
		bullet: BulletFactory.newLaser(username),
		energyCost: 10,
		canalizeTime: 1000,
		cooldawn: 500
	}
	return weapon
}

function laser() {
	let weapon = newWeapon()
	weapon.name = 'laser'
	weapon.canalizeTime = 0
	weapon.cooldawn *= 0.30
	weapon.active = true
	weapon.shoot = (ship) => {
		// let energyCost = ship.weapons[ship.currentWeaponIndex].bullet.energyCost
		// if (ship.energy >= energyCost) {
			if (weapon.active) {
				let bullet = BulletFactory.newLaser(ship.username)
				bullet.x = ship.x + 0 * Math.cos((ship.angle + 0) * Math.PI / 180)
				bullet.y = ship.y + 0 * Math.sin((ship.angle + 0) * Math.PI / 180)
				bullet.angle = ship.angle
				bullet.shipAcelerated = ship.acelerated
				
				global.gameObjects.bullets.push(bullet)
				
				weapon.active = false
				
				setTimeout(() => {
					weapon.active = true
				}, weapon.cooldawn)
			}
			// ship.energy -= energyCost
		// }
	}
	return weapon
}

function laser2() {
	let weapon = newWeapon()
	weapon.name = 'laser'
	weapon.canalizeTime = 0
	weapon.cooldawn *= 0.30
	weapon.active = true
	weapon.shoot = (ship) => {
		// let energyCost = ship.weapons[ship.currentWeaponIndex].bullet.energyCost
		// if (ship.energy >= energyCost) {
			if (weapon.active) {
				let bullet = BulletFactory.newLaser(ship.username)
				bullet.x = ship.x + 50 * Math.cos((ship.angle + 50) * Math.PI / 180)
				bullet.y = ship.y + 50 * Math.sin((ship.angle + 50) * Math.PI / 180)
				bullet.angle = ship.angle
				bullet.shipAcelerated = ship.acelerated
				
				let bullet2 = BulletFactory.newLaser(ship.username)
				bullet2.x = ship.x + 50 * Math.cos((ship.angle - 50) * Math.PI / 180)
				bullet2.y = ship.y + 50 * Math.sin((ship.angle - 50 ) * Math.PI / 180)
				bullet2.angle = ship.angle
				bullet2.shipAcelerated = ship.acelerated
				
				let bullet3 = BulletFactory.newLaser(ship.username)
				bullet3.x = ship.x + 115 * Math.cos((ship.angle + 115) * Math.PI / 180)
				bullet3.y = ship.y + 115 * Math.sin((ship.angle + 115) * Math.PI / 180)
				bullet3.angle = ship.angle
				bullet3.shipAcelerated = ship.acelerated
				
				let bullet4 = BulletFactory.newLaser(ship.username)
				bullet4.x = ship.x + 115 * Math.cos((ship.angle - 115) * Math.PI / 180)
				bullet4.y = ship.y + 115 * Math.sin((ship.angle - 115 ) * Math.PI / 180)
				bullet4.angle = ship.angle
				bullet4.shipAcelerated = ship.acelerated

				// 

				let bullet5 = BulletFactory.newLaser(ship.username)
				bullet5.x = ship.x + 50 * Math.cos((ship.angle + 50) * Math.PI / 180)
				bullet5.y = ship.y + 50 * Math.sin((ship.angle + 50) * Math.PI / 180)
				bullet5.angle = ship.angle + 30
				bullet5.shipAcelerated = ship.acelerated
				
				let bullet6 = BulletFactory.newLaser(ship.username)
				bullet6.x = ship.x + 50 * Math.cos((ship.angle - 50) * Math.PI / 180)
				bullet6.y = ship.y + 50 * Math.sin((ship.angle - 50 ) * Math.PI / 180)
				bullet6.angle = ship.angle + 30
				bullet6.shipAcelerated = ship.acelerated
				
				let bullet7 = BulletFactory.newLaser(ship.username)
				bullet7.x = ship.x + 115 * Math.cos((ship.angle + 115) * Math.PI / 180)
				bullet7.y = ship.y + 115 * Math.sin((ship.angle + 115) * Math.PI / 180)
				bullet7.angle = ship.angle + 30
				bullet7.shipAcelerated = ship.acelerated
				
				let bullet8 = BulletFactory.newLaser(ship.username)
				bullet8.x = ship.x + 115 * Math.cos((ship.angle - 115) * Math.PI / 180)
				bullet8.y = ship.y + 115 * Math.sin((ship.angle - 115 ) * Math.PI / 180)
				bullet8.angle = ship.angle + 30
				bullet8.shipAcelerated = ship.acelerated

				// 

				let bullet9 = BulletFactory.newLaser(ship.username)
				bullet9.x = ship.x + 50 * Math.cos((ship.angle + 50) * Math.PI / 180)
				bullet9.y = ship.y + 50 * Math.sin((ship.angle + 50) * Math.PI / 180)
				bullet9.angle = ship.angle - 30
				bullet9.shipAcelerated = ship.acelerated
				
				let bullet10 = BulletFactory.newLaser(ship.username)
				bullet10.x = ship.x + 50 * Math.cos((ship.angle - 50) * Math.PI / 180)
				bullet10.y = ship.y + 50 * Math.sin((ship.angle - 50 ) * Math.PI / 180)
				bullet10.angle = ship.angle - 30
				bullet10.shipAcelerated = ship.acelerated
				
				let bullet11 = BulletFactory.newLaser(ship.username)
				bullet11.x = ship.x + 115 * Math.cos((ship.angle + 115) * Math.PI / 180)
				bullet11.y = ship.y + 115 * Math.sin((ship.angle + 115) * Math.PI / 180)
				bullet11.angle = ship.angle - 30
				bullet11.shipAcelerated = ship.acelerated
				
				let bullet12 = BulletFactory.newLaser(ship.username)
				bullet12.x = ship.x + 115 * Math.cos((ship.angle - 115) * Math.PI / 180)
				bullet12.y = ship.y + 115 * Math.sin((ship.angle - 115 ) * Math.PI / 180)
				bullet12.angle = ship.angle - 30
				bullet12.shipAcelerated = ship.acelerated

				global.gameObjects.bullets.push(bullet, bullet2, bullet3, bullet4, bullet5, bullet6, bullet7, bullet8, bullet9, bullet10, bullet11, bullet12)
				
				weapon.active = false
				
				setTimeout(() => {
					weapon.active = true
				}, weapon.cooldawn)
			}

			// ship.energy -= energyCost
		// }
	}
	return weapon
}

module.exports = {
	laser, laser2
}