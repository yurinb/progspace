const PhysicObjectFactory = require('./PhysicObject')
const Animate = require('../actions/animate')
const WeaponFactory = require('../models/Weapon')
const AnimationsFactory = require('../models/Animation')


module.exports = {


	newShip: function (username) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', ['../img/ships/ship4.png'], 3000, true)
		let deadAnimation = AnimationsFactory.newAnimation('dead',
			['../img/sfx/explosion1.png', '../img/sfx/explosion2.png', '../img/sfx/explosion3.png', '../img/sfx/explosion4.png', '../img/sfx/explosion5.png', '../img/sfx/explosion6.png',
				'../img/sfx/explosion7.png', '../img/sfx/explosion8.png', '../img/sfx/explosion9.png', '../img/sfx/explosion10.png', '../img/sfx/explosion11.png', '../img/sfx/explosion12.png', '../img/sfx/explosion13.png'
			], 200, false)
		let propulsorAnimation = AnimationsFactory.newAnimation('idle', ['../img/sfx/propulsor1.png', '../img/sfx/propulsor2.png'], 100, true)

		let ship = {
			username: username,
			isPlayer: true,
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
	newMeteor: function (x, y) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', ['../img/meteor/meteor1.png', '../img/meteor/meteor2.png', '../img/meteor/meteor3.png', '../img/meteor/meteor4.png', '../img/meteor/meteor5.png', '../img/meteor/meteor6.png', '../img/meteor/meteor7.png', '../img/meteor/meteor8.png', '../img/meteor/meteor9.png', '../img/meteor/meteor10.png', '../img/meteor/meteor11.png', '../img/meteor/meteor12.png', '../img/meteor/meteor13.png', '../img/meteor/meteor14.png', '../img/meteor/meteor15.png', '../img/meteor/meteor16.png', '../img/meteor/meteor17.png', '../img/meteor/meteor18.png', '../img/meteor/meteor19.png', '../img/meteor/meteor20.png', '../img/meteor/meteor21.png', '../img/meteor/meteor22.png', '../img/meteor/meteor23.png', '../img/meteor/meteor24.png', '../img/meteor/meteor25.png', '../img/meteor/meteor26.png', '../img/meteor/meteor27.png', '../img/meteor/meteor28.png', '../img/meteor/meteor29.png', '../img/meteor/meteor30.png'
			], 100, true)
		let deadAnimation = AnimationsFactory.newAnimation('dead',
			['../img/sfx/explosion1.png', '../img/sfx/explosion2.png', '../img/sfx/explosion3.png', '../img/sfx/explosion4.png', '../img/sfx/explosion5.png', '../img/sfx/explosion6.png',
				'../img/sfx/explosion7.png', '../img/sfx/explosion8.png', '../img/sfx/explosion9.png', '../img/sfx/explosion10.png', '../img/sfx/explosion11.png', '../img/sfx/explosion12.png', '../img/sfx/explosion13.png'
			], 150, false)
		let propulsorAnimation = AnimationsFactory.newAnimation('idle', ['../img/sfx/propulsor1.png', '../img/sfx/propulsor2.png'
			], 100, true)

		const size = 250 + Math.random() * 1000

		let ship = {
			username: '',
			isMeteor: true,
			w: size,
			h: size,
			speed: 5 + Math.random() * 10,
			aceleration: 1,
			acelerated: 1 + Math.random() * 5,
			engineOn: false,
			shooting: false,
			propulsor: {
				on: false,
				state: 'idle',
				animation: propulsorAnimation,
				animations: [propulsorAnimation]
			},
			maxEnergy: 0,
			energy: 1000 + size,
			reactorSpeed: 0,
			weapons: [],
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

		physicShip.x = x
		physicShip.y = y

		physicShip.angle = Math.random() * 360

		Animate.animate(physicShip)
		Animate.animate(physicShip.propulsor)

		return physicShip
	}



}