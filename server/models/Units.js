const PhysicObjectFactory = require('./PhysicObject')
const Animate = require('../actions/animate')
const WeaponFactory = require('./Weapon')
const AnimationsFactory = require('./Animation')


module.exports = {


	newShip: function (username) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', ['../img/ships/ship4.png'], 9999, true)
		let deadAnimation = AnimationsFactory.newAnimation('dead',
			['../img/sfx/explosion1.png', '../img/sfx/explosion2.png', '../img/sfx/explosion3.png', '../img/sfx/explosion4.png', '../img/sfx/explosion5.png', '../img/sfx/explosion6.png',
				'../img/sfx/explosion7.png', '../img/sfx/explosion8.png', '../img/sfx/explosion9.png', '../img/sfx/explosion10.png', '../img/sfx/explosion11.png', '../img/sfx/explosion12.png', '../img/sfx/explosion13.png'
			], 200, false)
		let propulsorAnimation = AnimationsFactory.newAnimation('idle', ['../img/sfx/propulsor1.png', '../img/sfx/propulsor2.png'], 200, true)

		let objectProperties = {
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
				isPropulsor: true,
				on: false,
				state: 'idle',
				animation: propulsorAnimation,
				animations: [propulsorAnimation]
			},
			maxEnergy: 1000,
			energy: 1000,
			reactorSpeed: 1,
			weapons: [WeaponFactory.laser2()],
			currentWeaponIndex: 0,
			state: 'idle',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			}
		}
		let physicObject = PhysicObjectFactory.newPhysicObject()

		let unit = Object.assign(physicObject, objectProperties)

		Animate.animate(unit)
		Animate.animate(unit.propulsor)

		return unit
	},


	newMeteor: function (x, y) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', ['../img/meteor/meteor1.png', '../img/meteor/meteor2.png', '../img/meteor/meteor3.png', '../img/meteor/meteor4.png', '../img/meteor/meteor5.png', '../img/meteor/meteor6.png', '../img/meteor/meteor7.png', '../img/meteor/meteor8.png', '../img/meteor/meteor9.png', '../img/meteor/meteor10.png', '../img/meteor/meteor11.png', '../img/meteor/meteor12.png', '../img/meteor/meteor13.png', '../img/meteor/meteor14.png', '../img/meteor/meteor15.png', '../img/meteor/meteor16.png', '../img/meteor/meteor17.png', '../img/meteor/meteor18.png', '../img/meteor/meteor19.png', '../img/meteor/meteor20.png', '../img/meteor/meteor21.png', '../img/meteor/meteor22.png', '../img/meteor/meteor23.png', '../img/meteor/meteor24.png', '../img/meteor/meteor25.png', '../img/meteor/meteor26.png', '../img/meteor/meteor27.png', '../img/meteor/meteor28.png', '../img/meteor/meteor29.png', '../img/meteor/meteor30.png'
			], 100, true)
		let deadAnimation = AnimationsFactory.newAnimation('dead',
			['../img/sfx/explosion1.png', '../img/sfx/explosion2.png', '../img/sfx/explosion3.png', '../img/sfx/explosion4.png', '../img/sfx/explosion5.png', '../img/sfx/explosion6.png',
				'../img/sfx/explosion7.png', '../img/sfx/explosion8.png', '../img/sfx/explosion9.png', '../img/sfx/explosion10.png', '../img/sfx/explosion11.png', '../img/sfx/explosion12.png', '../img/sfx/explosion13.png'
			], 150, false)

		const size = 250 + Math.random() * 1000

		let objectProperties = {
			username: '',
			isMeteor: true,
			w: size,
			h: size,
			speed: 15 + Math.random() * 25,
			energy: 1000 + size,
			reactorSpeed: 0,
			state: 'idle',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			}
		}
		let physicObject = PhysicObjectFactory.newPhysicObject()

		let unit = Object.assign(physicObject, objectProperties)

		unit.x = x
		unit.y = y

		unit.angle = Math.random() * 360

		Animate.animate(unit)

		return unit
	}



}