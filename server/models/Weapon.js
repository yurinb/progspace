const ProjetilFactory = require('../models/Projetil')

function newWeapon() {
	let weapon = {
		name: '',
		projectile: null,
		energyCost: 10,
		canalizeTime: 1000,
		cooldawn: 500
	}
	return weapon
}

function laser(ownerID) {
	let weapon = newWeapon()
	weapon.name = 'laser'
	weapon.canalizeTime = 0
	weapon.cooldawn *= 0.15
	weapon.active = true
	weapon.shoot = (unit) => {
		// let energyCost = unit.weapons[unit.currentWeaponIndex].projectile.energyCost
		// if (unit.energy >= energyCost) {
			if (weapon.active) {
				let projectile = ProjetilFactory.plasma(ownerID)
				projectile.x = unit.x + Math.floor(0 * Math.cos((unit.angle + 0) * Math.PI / 180))
				projectile.y = unit.y + Math.floor(0 * Math.sin((unit.angle + 0) * Math.PI / 180))
				projectile.angle = unit.angle
				projectile.unitAcelerated = unit.acelerated
				
				global.gameObjects.projectiles[projectile.id] = projectile
				
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

function laser2(ownerID) {
	let weapon = newWeapon()
	weapon.name = 'laser2'
	weapon.canalizeTime = 0
	weapon.cooldawn *= 0.40
	weapon.lastShoot = 0
	weapon.active = true
	weapon.shoot = (unit) => {
		// let energyCost = unit.weapons[unit.currentWeaponIndex].projectile.energyCost
		// if (unit.energy >= energyCost) {
			if (weapon.active) {
				if (weapon.lastShoot == 0) {
					const projectile = ProjetilFactory.plasma(ownerID)
					projectile.x = unit.x + Math.floor(150 * Math.cos((unit.angle + 35) * Math.PI / 180))
					projectile.y = unit.y + Math.floor(150 * Math.sin((unit.angle + 35) * Math.PI / 180))
					projectile.angle = unit.angle
					projectile.unitAcelerated = unit.acelerated
					weapon.lastShoot = 1
					global.gameObjects.projectiles[projectile.id] = projectile
					global.gameObjects.newObjects.projectiles[projectile.id] = projectile
					return
				}
					
				if (weapon.lastShoot == 1) {
					const projectile2 = ProjetilFactory.plasma(ownerID)
					projectile2.x = unit.x + Math.floor(150 * Math.cos((unit.angle - 35) * Math.PI / 180))
					projectile2.y = unit.y + Math.floor(150 * Math.sin((unit.angle - 35 ) * Math.PI / 180))
					projectile2.angle = unit.angle
					projectile2.unitAcelerated = unit.acelerated
					weapon.lastShoot = 0
					global.gameObjects.projectiles[projectile2.id] = projectile2
					global.gameObjects.newObjects.projectiles[projectile2.id] = projectile2
					return
				}
				// let projectile3 = ProjetilFactory.plasma(ownerID)
				// projectile3.x = unit.x + Math.floor(125 * Math.cos((unit.angle + 125) * Math.PI / 180))
				// projectile3.y = unit.y + Math.floor(125 * Math.sin((unit.angle + 125) * Math.PI / 180))
				// projectile3.angle = unit.angle
				// projectile3.unitAcelerated = unit.acelerated
				
				// let projectile4 = ProjetilFactory.plasma(ownerID)
				// projectile4.x = unit.x + Math.floor(125 * Math.cos((unit.angle - 125) * Math.PI / 180))
				// projectile4.y = unit.y + Math.floor(125 * Math.sin((unit.angle - 125 ) * Math.PI / 180))
				// projectile4.angle = unit.angle
				// projectile4.unitAcelerated = unit.acelerated

				// 

				// let projectile5 = ProjetilFactory.plasma(ownerID)
				// projectile5.x = unit.x + Math.floor(50 * Math.cos((unit.angle + 50) * Math.PI / 180))
				// projectile5.y = unit.y + Math.floor(50 * Math.sin((unit.angle + 50) * Math.PI / 180))
				// projectile5.angle = unit.angle + 30
				// projectile5.unitAcelerated = unit.acelerated
				
				// let projectile6 = ProjetilFactory.plasma(ownerID)
				// projectile6.x = unit.x + Math.floor(50 * Math.cos((unit.angle - 50) * Math.PI / 180))
				// projectile6.y = unit.y + Math.floor(50 * Math.sin((unit.angle - 50 ) * Math.PI / 180))
				// projectile6.angle = unit.angle + 30
				// projectile6.unitAcelerated = unit.acelerated
				
				// let projectile7 = ProjetilFactory.plasma(ownerID)
				// projectile7.x = unit.x + Math.floor(115 * Math.cos((unit.angle + 115) * Math.PI / 180))
				// projectile7.y = unit.y + Math.floor(115 * Math.sin((unit.angle + 115) * Math.PI / 180))
				// projectile7.angle = unit.angle + 30
				// projectile7.unitAcelerated = unit.acelerated
				
				// let projectile8 = ProjetilFactory.plasma(ownerID)
				// projectile8.x = unit.x + Math.floor(115 * Math.cos((unit.angle - 115) * Math.PI / 180))
				// projectile8.y = unit.y + Math.floor(115 * Math.sin((unit.angle - 115 ) * Math.PI / 180))
				// projectile8.angle = unit.angle + 30
				// projectile8.unitAcelerated = unit.acelerated

				// // 

				// let projectile9 = ProjetilFactory.plasma(ownerID)
				// projectile9.x = unit.x + Math.floor(50 * Math.cos((unit.angle + 50) * Math.PI / 180))
				// projectile9.y = unit.y + Math.floor(50 * Math.sin((unit.angle + 50) * Math.PI / 180))
				// projectile9.angle = unit.angle - 30
				// projectile9.unitAcelerated = unit.acelerated
				
				// let projectile10 = ProjetilFactory.plasma(ownerID)
				// projectile10.x = unit.x + Math.floor(50 * Math.cos((unit.angle - 50) * Math.PI / 180))
				// projectile10.y = unit.y + Math.floor(50 * Math.sin((unit.angle - 50 ) * Math.PI / 180))
				// projectile10.angle = unit.angle - 30
				// projectile10.unitAcelerated = unit.acelerated
				
				// let projectile11 = ProjetilFactory.plasma(ownerID)
				// projectile11.x = unit.x + Math.floor(115 * Math.cos((unit.angle + 115) * Math.PI / 180))
				// projectile11.y = unit.y + Math.floor(115 * Math.sin((unit.angle + 115) * Math.PI / 180))
				// projectile11.angle = unit.angle - 30
				// projectile11.unitAcelerated = unit.acelerated
				
				// let projectile12 = ProjetilFactory.plasma(ownerID)
				// projectile12.x = unit.x + Math.floor(115 * Math.cos((unit.angle - 115) * Math.PI / 180))
				// projectile12.y = unit.y + Math.floor(115 * Math.sin((unit.angle - 115 ) * Math.PI / 180))
				// projectile12.angle = unit.angle - 30
				// projectile12.unitAcelerated = unit.acelerated

				// global.gameObjects.projectiles[projectile3.id] = projectile3
				// global.gameObjects.projectiles[projectile4.id] = projectile4
				// global.gameObjects.projectiles[projectile5.id] = projectile5
				// global.gameObjects.projectiles[projectile6.id] = projectile6
				// global.gameObjects.projectiles[projectile7.id] = projectile7
				// global.gameObjects.projectiles[projectile8.id] = projectile8
				// global.gameObjects.projectiles[projectile9.id] = projectile9
				// global.gameObjects.projectiles[projectile10.id] = projectile10
				// global.gameObjects.projectiles[projectile11.id] = projectile11
				// global.gameObjects.projectiles[projectile12.id] = projectile12

				// global.gameObjects.newObjects.projectiles[projectile3.id] = projectile3
				// global.gameObjects.newObjects.projectiles[projectile4.id] = projectile4
				// global.gameObjects.newObjects.projectiles[projectile5.id] = projectile5
				// global.gameObjects.newObjects.projectiles[projectile6.id] = projectile6
				// global.gameObjects.newObjects.projectiles[projectile7.id] = projectile7
				// global.gameObjects.newObjects.projectiles[projectile8.id] = projectile8
				// global.gameObjects.newObjects.projectiles[projectile9.id] = projectile9
				// global.gameObjects.newObjects.projectiles[projectile10.id] = projectile10
				// global.gameObjects.newObjects.projectiles[projectile11.id] = projectile11
				// global.gameObjects.newObjects.projectiles[projectile12.id] = projectile12
				
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