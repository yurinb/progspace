const PhysicObjectFactory = require('./PhysicObject')
const Animate = require('../actions/animate')
const collideObjects = require('../actions/collide-objects')
const WeaponFactory = require('./Weapon')
const AnimationsFactory = require('./Animation')


module.exports = {


	newShip: function (username) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', ['../img/units/unit4.png'], 9999, true)
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
			speed: 100,
			aceleration: 1,
			acelerated: 0,
			velY: 0,
			velX: 0,
			engineOn: false,
			shooting: false,
			propulsor: {
				isPropulsor: true,
				on: false,
				animation: propulsorAnimation,
				animations: [propulsorAnimation]
			},
			maxEnergy: 1000,
			energy: 1000,
			reactorSpeed: 1,
			weapons: [WeaponFactory.laser2()],
			currentWeaponIndex: 0,
			state: 'alive',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			},
			move: function () {
				if (this.state != 'alive') return
			
				let tempVelY = 0
				let tempVelX = 0
			
				if (this.pressingW) tempVelY = -1
				if (this.pressingS) tempVelY = 1
			
				if (this.pressingA) tempVelX = -1
				if (this.pressingD) tempVelX = 1
				
				let isMoving = true

				if (tempVelX == 0 && tempVelY == 0) {
					isMoving = false
				} else {
					this.velY = tempVelY;
					this.velX = tempVelX;
				}
				console.log(this.velX ,this.velY )
				const length = Math.sqrt(this.velX * this.velX + this.velY * this.velY);

				let moveAngle = Math.atan2(this.y - (this.y += this.velY), this.x - (this.x += this.velX)) * 180 / Math.PI
				moveAngle += 180
				
				if (moveAngle < 0) {
					moveAngle += 360
				}

				if (!this.shooting) {
					this.angle = moveAngle
				} 
				
				if (length != 0) {

					if (isMoving) {
						if (this.angle - moveAngle < 30 && this.angle - moveAngle > -30) {
							this.propulsor.on = true
							if (this.acelerated <= this.speed) {
								this.acelerated += this.aceleration
							}
						} else {
							console.log('off1')
							this.propulsor.on = false
							if (this.acelerated >= this.speed * 0.50) {
								this.acelerated -= this.aceleration
							}
						}
					} else {
						this.propulsor.on = false
							if (this.acelerated > 0) {
								this.acelerated -= this.aceleration * 2
							} else {
								this.acelerated = 0
							}
					}

					this.velX /= length;
					this.velY /= length;

					
				} else {
					this.propulsor.on = false
					if (this.acelerated > 0) {
						this.acelerated -= this.aceleration
					} else {
						this.acelerated = 0
					}
				}

				this.x = Math.ceil(this.x + this.velX * this.acelerated)
				this.y = Math.ceil(this.y + this.velY * this.acelerated)
			},
			getClientVariables: function() {
				return {
					id: this.id,
					username: this.username,
					isPlayer: this.isPlayer,
					x: this.x,
					y: this.y,
					h: this.w,
					w: this.h,
					angle: this.angle,
					maxEnergy: this.maxEnergy,
					energy: this.energy,
					frame: this.animation.frame,
					prop_frame: this.propulsor.animation.frame,
					prop_on: this.propulsor.on,
					weapon: this.currentWeaponIndex,
					shooting: this.shooting
				}
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
			angle: Math.floor(Math.random() * 360),
			speed: 15 + Math.random() * 25,
			energy: 1000 + size,
			reactorSpeed: 0,
			state: 'alive',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			},
			move: function () {
				if (this.state != 'alive') return

				const collided = collideObjects.elementCollidesWithShip(this, unitCollided => {
					if (unitCollided.state == 'alive') {
						unitCollided.dies()
						if (unitCollided.isMeteor) {
							this.dies()
						}
					}
				})

				if (!collided) {
					this.x += Math.floor(this.speed * Math.cos(this.angle * Math.PI / 180))
					this.y += Math.floor(this.speed * Math.sin(this.angle * Math.PI / 180))
				}
			},
			getClientVariables: function() {
				return {
					id: this.id,
					x: this.x,
					y: this.y,
					h: this.w,
					w: this.h,
					angle: this.angle,
					isMeteor: this.isMeteor,
					frame: this.animation.frame,
				}
			}
		}
		let physicObject = PhysicObjectFactory.newPhysicObject()

		let unit = Object.assign(physicObject, objectProperties)

		unit.x = x
		unit.y = y

		Animate.animate(unit)

		return unit
	}



}