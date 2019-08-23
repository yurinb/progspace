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
	weapon.shoot = (unit) => {
		// let energyCost = unit.weapons[unit.currentWeaponIndex].bullet.energyCost
		// if (unit.energy >= energyCost) {
			if (weapon.active) {
				let bullet = BulletFactory.newLaser(unit.username)
				bullet.x = unit.x + 0 * Math.cos((unit.angle + 0) * Math.PI / 180)
				bullet.y = unit.y + 0 * Math.sin((unit.angle + 0) * Math.PI / 180)
				bullet.angle = unit.angle
				bullet.unitAcelerated = unit.acelerated
				
				global.gameObjects.projetils.push(bullet)
				
				weapon.active = false
				
				setTimeout(() => {
					weapon.active = true
				}, weapon.cooldawn)
			}
			// unit.energy -= energyCost
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
	weapon.shoot = (unit) => {
		// let energyCost = unit.weapons[unit.currentWeaponIndex].bullet.energyCost
		// if (unit.energy >= energyCost) {
			if (weapon.active) {
				let bullet = BulletFactory.newLaser(unit.username)
				bullet.x = unit.x + 50 * Math.cos((unit.angle + 50) * Math.PI / 180)
				bullet.y = unit.y + 50 * Math.sin((unit.angle + 50) * Math.PI / 180)
				bullet.angle = unit.angle
				bullet.unitAcelerated = unit.acelerated
				
				let bullet2 = BulletFactory.newLaser(unit.username)
				bullet2.x = unit.x + 50 * Math.cos((unit.angle - 50) * Math.PI / 180)
				bullet2.y = unit.y + 50 * Math.sin((unit.angle - 50 ) * Math.PI / 180)
				bullet2.angle = unit.angle
				bullet2.unitAcelerated = unit.acelerated
				
				let bullet3 = BulletFactory.newLaser(unit.username)
				bullet3.x = unit.x + 115 * Math.cos((unit.angle + 115) * Math.PI / 180)
				bullet3.y = unit.y + 115 * Math.sin((unit.angle + 115) * Math.PI / 180)
				bullet3.angle = unit.angle
				bullet3.unitAcelerated = unit.acelerated
				
				let bullet4 = BulletFactory.newLaser(unit.username)
				bullet4.x = unit.x + 115 * Math.cos((unit.angle - 115) * Math.PI / 180)
				bullet4.y = unit.y + 115 * Math.sin((unit.angle - 115 ) * Math.PI / 180)
				bullet4.angle = unit.angle
				bullet4.unitAcelerated = unit.acelerated

				// 

				let bullet5 = BulletFactory.newLaser(unit.username)
				bullet5.x = unit.x + 50 * Math.cos((unit.angle + 50) * Math.PI / 180)
				bullet5.y = unit.y + 50 * Math.sin((unit.angle + 50) * Math.PI / 180)
				bullet5.angle = unit.angle + 30
				bullet5.unitAcelerated = unit.acelerated
				
				let bullet6 = BulletFactory.newLaser(unit.username)
				bullet6.x = unit.x + 50 * Math.cos((unit.angle - 50) * Math.PI / 180)
				bullet6.y = unit.y + 50 * Math.sin((unit.angle - 50 ) * Math.PI / 180)
				bullet6.angle = unit.angle + 30
				bullet6.unitAcelerated = unit.acelerated
				
				let bullet7 = BulletFactory.newLaser(unit.username)
				bullet7.x = unit.x + 115 * Math.cos((unit.angle + 115) * Math.PI / 180)
				bullet7.y = unit.y + 115 * Math.sin((unit.angle + 115) * Math.PI / 180)
				bullet7.angle = unit.angle + 30
				bullet7.unitAcelerated = unit.acelerated
				
				let bullet8 = BulletFactory.newLaser(unit.username)
				bullet8.x = unit.x + 115 * Math.cos((unit.angle - 115) * Math.PI / 180)
				bullet8.y = unit.y + 115 * Math.sin((unit.angle - 115 ) * Math.PI / 180)
				bullet8.angle = unit.angle + 30
				bullet8.unitAcelerated = unit.acelerated

				// 

				let bullet9 = BulletFactory.newLaser(unit.username)
				bullet9.x = unit.x + 50 * Math.cos((unit.angle + 50) * Math.PI / 180)
				bullet9.y = unit.y + 50 * Math.sin((unit.angle + 50) * Math.PI / 180)
				bullet9.angle = unit.angle - 30
				bullet9.unitAcelerated = unit.acelerated
				
				let bullet10 = BulletFactory.newLaser(unit.username)
				bullet10.x = unit.x + 50 * Math.cos((unit.angle - 50) * Math.PI / 180)
				bullet10.y = unit.y + 50 * Math.sin((unit.angle - 50 ) * Math.PI / 180)
				bullet10.angle = unit.angle - 30
				bullet10.unitAcelerated = unit.acelerated
				
				let bullet11 = BulletFactory.newLaser(unit.username)
				bullet11.x = unit.x + 115 * Math.cos((unit.angle + 115) * Math.PI / 180)
				bullet11.y = unit.y + 115 * Math.sin((unit.angle + 115) * Math.PI / 180)
				bullet11.angle = unit.angle - 30
				bullet11.unitAcelerated = unit.acelerated
				
				let bullet12 = BulletFactory.newLaser(unit.username)
				bullet12.x = unit.x + 115 * Math.cos((unit.angle - 115) * Math.PI / 180)
				bullet12.y = unit.y + 115 * Math.sin((unit.angle - 115 ) * Math.PI / 180)
				bullet12.angle = unit.angle - 30
				bullet12.unitAcelerated = unit.acelerated

				global.gameObjects.projetils.push(bullet, bullet2, bullet3, bullet4, bullet5, bullet6, bullet7, bullet8, bullet9, bullet10, bullet11, bullet12)
				
				weapon.active = false
				
				setTimeout(() => {
					weapon.active = true
				}, weapon.cooldawn)
			}

			// unit.energy -= energyCost
		// }
	}
	return weapon
}

module.exports = {
	laser, laser2
}