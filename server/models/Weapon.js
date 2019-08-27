const ProjetilFactory = require('../models/Projetil')

function newWeapon() {
	let weapon = {
		name: '',
		projetil: null,
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
	weapon.cooldawn *= 0.30
	weapon.active = true
	weapon.shoot = (unit) => {
		// let energyCost = unit.weapons[unit.currentWeaponIndex].projetil.energyCost
		// if (unit.energy >= energyCost) {
			if (weapon.active) {
				let projetil = ProjetilFactory.newLaser(ownerID)
				projetil.x = unit.x + Math.floor(0 * Math.cos((unit.angle + 0) * Math.PI / 180))
				projetil.y = unit.y + Math.floor(0 * Math.sin((unit.angle + 0) * Math.PI / 180))
				projetil.angle = unit.angle
				projetil.unitAcelerated = unit.acelerated
				
				global.gameObjects.projetils[projetil.id] = projetil
				
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
	weapon.cooldawn *= 0.35
	weapon.active = true
	weapon.shoot = (unit) => {
		// let energyCost = unit.weapons[unit.currentWeaponIndex].projetil.energyCost
		// if (unit.energy >= energyCost) {
			if (weapon.active) {
				let projetil = ProjetilFactory.newLaser(ownerID)
				projetil.x = unit.x + Math.floor(150 * Math.cos((unit.angle + 25) * Math.PI / 180))
				projetil.y = unit.y + Math.floor(150 * Math.sin((unit.angle + 25) * Math.PI / 180))
				projetil.angle = unit.angle
				projetil.unitAcelerated = unit.acelerated
				
				let projetil2 = ProjetilFactory.newLaser(ownerID)
				projetil2.x = unit.x + Math.floor(150 * Math.cos((unit.angle - 25) * Math.PI / 180))
				projetil2.y = unit.y + Math.floor(150 * Math.sin((unit.angle - 25 ) * Math.PI / 180))
				projetil2.angle = unit.angle
				projetil2.unitAcelerated = unit.acelerated
				
				// let projetil3 = ProjetilFactory.newLaser(ownerID)
				// projetil3.x = unit.x + Math.floor(125 * Math.cos((unit.angle + 125) * Math.PI / 180))
				// projetil3.y = unit.y + Math.floor(125 * Math.sin((unit.angle + 125) * Math.PI / 180))
				// projetil3.angle = unit.angle
				// projetil3.unitAcelerated = unit.acelerated
				
				// let projetil4 = ProjetilFactory.newLaser(ownerID)
				// projetil4.x = unit.x + Math.floor(125 * Math.cos((unit.angle - 125) * Math.PI / 180))
				// projetil4.y = unit.y + Math.floor(125 * Math.sin((unit.angle - 125 ) * Math.PI / 180))
				// projetil4.angle = unit.angle
				// projetil4.unitAcelerated = unit.acelerated

				// 

				// let projetil5 = ProjetilFactory.newLaser(ownerID)
				// projetil5.x = unit.x + Math.floor(50 * Math.cos((unit.angle + 50) * Math.PI / 180))
				// projetil5.y = unit.y + Math.floor(50 * Math.sin((unit.angle + 50) * Math.PI / 180))
				// projetil5.angle = unit.angle + 30
				// projetil5.unitAcelerated = unit.acelerated
				
				// let projetil6 = ProjetilFactory.newLaser(ownerID)
				// projetil6.x = unit.x + Math.floor(50 * Math.cos((unit.angle - 50) * Math.PI / 180))
				// projetil6.y = unit.y + Math.floor(50 * Math.sin((unit.angle - 50 ) * Math.PI / 180))
				// projetil6.angle = unit.angle + 30
				// projetil6.unitAcelerated = unit.acelerated
				
				// let projetil7 = ProjetilFactory.newLaser(ownerID)
				// projetil7.x = unit.x + Math.floor(115 * Math.cos((unit.angle + 115) * Math.PI / 180))
				// projetil7.y = unit.y + Math.floor(115 * Math.sin((unit.angle + 115) * Math.PI / 180))
				// projetil7.angle = unit.angle + 30
				// projetil7.unitAcelerated = unit.acelerated
				
				// let projetil8 = ProjetilFactory.newLaser(ownerID)
				// projetil8.x = unit.x + Math.floor(115 * Math.cos((unit.angle - 115) * Math.PI / 180))
				// projetil8.y = unit.y + Math.floor(115 * Math.sin((unit.angle - 115 ) * Math.PI / 180))
				// projetil8.angle = unit.angle + 30
				// projetil8.unitAcelerated = unit.acelerated

				// // 

				// let projetil9 = ProjetilFactory.newLaser(ownerID)
				// projetil9.x = unit.x + Math.floor(50 * Math.cos((unit.angle + 50) * Math.PI / 180))
				// projetil9.y = unit.y + Math.floor(50 * Math.sin((unit.angle + 50) * Math.PI / 180))
				// projetil9.angle = unit.angle - 30
				// projetil9.unitAcelerated = unit.acelerated
				
				// let projetil10 = ProjetilFactory.newLaser(ownerID)
				// projetil10.x = unit.x + Math.floor(50 * Math.cos((unit.angle - 50) * Math.PI / 180))
				// projetil10.y = unit.y + Math.floor(50 * Math.sin((unit.angle - 50 ) * Math.PI / 180))
				// projetil10.angle = unit.angle - 30
				// projetil10.unitAcelerated = unit.acelerated
				
				// let projetil11 = ProjetilFactory.newLaser(ownerID)
				// projetil11.x = unit.x + Math.floor(115 * Math.cos((unit.angle + 115) * Math.PI / 180))
				// projetil11.y = unit.y + Math.floor(115 * Math.sin((unit.angle + 115) * Math.PI / 180))
				// projetil11.angle = unit.angle - 30
				// projetil11.unitAcelerated = unit.acelerated
				
				// let projetil12 = ProjetilFactory.newLaser(ownerID)
				// projetil12.x = unit.x + Math.floor(115 * Math.cos((unit.angle - 115) * Math.PI / 180))
				// projetil12.y = unit.y + Math.floor(115 * Math.sin((unit.angle - 115 ) * Math.PI / 180))
				// projetil12.angle = unit.angle - 30
				// projetil12.unitAcelerated = unit.acelerated

				global.gameObjects.projetils[projetil.id] = projetil
				global.gameObjects.projetils[projetil2.id] = projetil2
				// global.gameObjects.projetils[projetil3.id] = projetil3
				// global.gameObjects.projetils[projetil4.id] = projetil4
				// global.gameObjects.projetils[projetil5.id] = projetil5
				// global.gameObjects.projetils[projetil6.id] = projetil6
				// global.gameObjects.projetils[projetil7.id] = projetil7
				// global.gameObjects.projetils[projetil8.id] = projetil8
				// global.gameObjects.projetils[projetil9.id] = projetil9
				// global.gameObjects.projetils[projetil10.id] = projetil10
				// global.gameObjects.projetils[projetil11.id] = projetil11
				// global.gameObjects.projetils[projetil12.id] = projetil12

				global.gameObjects.newObjects.projetils[projetil.id] = projetil
				global.gameObjects.newObjects.projetils[projetil2.id] = projetil2
				// global.gameObjects.newObjects.projetils[projetil3.id] = projetil3
				// global.gameObjects.newObjects.projetils[projetil4.id] = projetil4
				// global.gameObjects.newObjects.projetils[projetil5.id] = projetil5
				// global.gameObjects.newObjects.projetils[projetil6.id] = projetil6
				// global.gameObjects.newObjects.projetils[projetil7.id] = projetil7
				// global.gameObjects.newObjects.projetils[projetil8.id] = projetil8
				// global.gameObjects.newObjects.projetils[projetil9.id] = projetil9
				// global.gameObjects.newObjects.projetils[projetil10.id] = projetil10
				// global.gameObjects.newObjects.projetils[projetil11.id] = projetil11
				// global.gameObjects.newObjects.projetils[projetil12.id] = projetil12
				
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