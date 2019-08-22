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
	weapon.cooldawn *= 0.35
	weapon.shoot = (ship) => {
		// let energyCost = ship.weapons[ship.currentWeaponIndex].bullet.energyCost
		// if (ship.energy >= energyCost) {
			let bullet = BulletFactory.newLaser(ship.username)
			bullet.x = ship.x + 0 * Math.cos((ship.angle + 0) * Math.PI / 180)
			bullet.y = ship.y + 0 * Math.sin((ship.angle + 0) * Math.PI / 180)
			bullet.angle = ship.angle
			bullet.shipAcelerated = ship.acelerated

			global.gameObjects.bullets.push(bullet)

			// ship.energy -= energyCost
		// }
	}
	return weapon
}

function laser2() {
	let weapon = newWeapon()
	weapon.name = 'laser'
	weapon.cooldawn -= weapon.cooldawn / 2
	weapon.shoot = (ship) => {
		// let energyCost = ship.weapons[ship.currentWeaponIndex].bullet.energyCost
		// if (ship.energy >= energyCost) {
			let bullet = BulletFactory.newLaser(ship.username)
			bullet.x = ship.x + 85 * Math.cos((ship.angle + 85) * Math.PI / 180)
			bullet.y = ship.y + 85 * Math.sin((ship.angle + 85) * Math.PI / 180)
			bullet.angle = ship.angle
			bullet.shipAcelerated = ship.acelerated
			
			let bullet2 = BulletFactory.newLaser(ship.username)
			bullet2.x = ship.x + 85 * Math.cos((ship.angle - 85) * Math.PI / 180)
			bullet2.y = ship.y + 85 * Math.sin((ship.angle - 85 ) * Math.PI / 180)
			bullet2.angle = ship.angle
			bullet2.shipAcelerated = ship.acelerated

			global.gameObjects.bullets.push(bullet, bullet2)

			// ship.energy -= energyCost
		// }
	}
	return weapon
}

module.exports = {
	laser, laser2
}