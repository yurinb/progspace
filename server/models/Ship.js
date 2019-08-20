const PhysicObjectFactory = require('./PhysicObject')
const Animate = require('../actions/animate')
const WeaponFactory = require('../models/Weapon')
const AnimationsFactory = require('../models/Animation')


module.exports = {


	newShip: function (username) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', ['../img/ships/ship4.png'], 3000, true)
		let deadAnimation = AnimationsFactory.newAnimation('dead',
			['/img/sfx/explosion1.png', '/img/sfx/explosion2.png', '/img/sfx/explosion3.png', '/img/sfx/explosion4.png', '/img/sfx/explosion5.png', '/img/sfx/explosion6.png',
				'/img/sfx/explosion7.png', '/img/sfx/explosion8.png', '/img/sfx/explosion9.png', '/img/sfx/explosion10.png', '/img/sfx/explosion11.png', '/img/sfx/explosion12.png', '/img/sfx/explosion13.png'
			], 200, false)
		let propulsorAnimation = AnimationsFactory.newAnimation('idle', ['../img/sfx/propulsor1.png', '../img/sfx/propulsor2.png'], 100, true)

		let ship = {
			username: username,
			w: 100,
			h: 100,
			speed: 5,
			aceleration: 1,
			acelerated: 0,
			engineOn: false,
			shooting: false,
			propulsor: {
				on: false,
				state: 'idle',
				animation: propulsorAnimation,
				animations: [propulsorAnimation]
			},
			maxEnergy: 1000,
			energy: 1000,
			reactorSpeed: 1,
			weapons: [WeaponFactory.laser()],
			currentWeaponIndex: 0,
			state: 'idle',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			}
		}
		let physicObject = PhysicObjectFactory.newPhysicObject()

		let physicShip = Object.assign(physicObject, ship)

		Animate.animate(physicShip)
		Animate.animate(physicShip.propulsor)

		return physicShip
	},


	// TODO
	newMeteor: function (username) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', ['../img/ships/ship4.png'], 3000, true)
		let deadAnimation = AnimationsFactory.newAnimation('dead',
			['/img/sfx/explosion1.png', '/img/sfx/explosion2.png', '/img/sfx/explosion3.png', '/img/sfx/explosion4.png', '/img/sfx/explosion5.png', '/img/sfx/explosion6.png',
				'/img/sfx/explosion7.png', '/img/sfx/explosion8.png', '/img/sfx/explosion9.png', '/img/sfx/explosion10.png', '/img/sfx/explosion11.png', '/img/sfx/explosion12.png', '/img/sfx/explosion13.png'
			], 200, false)
		let propulsorAnimation = AnimationsFactory.newAnimation('idle', ['../img/sfx/propulsor1.png', '../img/sfx/propulsor2.png'], 100, true)

		let ship = {
			username: username,
			w: 100,
			h: 100,
			speed: 5,
			aceleration: 1,
			acelerated: 0,
			engineOn: false,
			shooting: false,
			propulsor: {
				on: false,
				state: 'idle',
				animation: propulsorAnimation,
				animations: [propulsorAnimation]
			},
			maxEnergy: 1000,
			energy: 1000,
			reactorSpeed: 1,
			weapons: [WeaponFactory.laser()],
			currentWeaponIndex: 0,
			state: 'idle',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			}
		}
		let physicObject = PhysicObjectFactory.newPhysicObject()

		let physicShip = Object.assign(physicObject, ship)

		Animate.animate(physicShip)
		Animate.animate(physicShip.propulsor)

		return physicShip
	}



}