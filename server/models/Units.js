const PhysicObjectFactory = require('./PhysicObject')
const Animate = require('../actions/animate')
const collideObjects = require('../actions/collide-objects')
const WeaponFactory = require('./Weapon')
const AnimationsFactory = require('./Animation')

module.exports = {


	newShip: function (username) {
		let iddleAnimation = AnimationsFactory.newAnimation('idle', '../img/units/unit', 9999, 1, true, 0)
		let deadAnimation = AnimationsFactory.newAnimation('dead', '../img/sfx/explosion', 200, 13, false, 1)

		let propulsorAnimation = AnimationsFactory.newAnimation('idle', '../img/sfx/propulsor', 200, 2, true, 0)

		let objectProperties = {
			username: username,
			isPlayer: true,
			w: 100,
			h: 100,
			speed: 50,
			aceleration: 5,
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
				const length = Math.sqrt(this.velX * this.velX + this.velY * this.velY);

				let moveAngle = Math.atan2(this.y - (this.y + this.velY), this.x - (this.x + this.velX)) * 180 / Math.PI
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
							this.propulsor.on = false
							if (this.acelerated >= this.speed * 0.50) {
								this.acelerated -= this.aceleration
							} else {
								this.acelerated += this.aceleration
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
						this.acelerated -= this.aceleration * 2
					} else {
						this.acelerated = 0
					}
				}

				this.x = this.x + Math.floor(this.velX * this.acelerated)
				this.y = this.y + Math.floor(this.velY * this.acelerated)
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
					animations: Object.keys(this.animations).map( key => this.animations[key].frame ),
					ai: this.animation.animationIndex,
					fi: this.animation.frameIndex,
					propulsor: {
						on: this.propulsor.on,
						animations: Object.keys(this.propulsor.animations).map( key => this.propulsor.animations[key].frame ),
						ai: this.propulsor.animation.animationIndex,
						fi: this.propulsor.animation.frameIndex,
					},
					weapon: this.currentWeaponIndex,
					shooting: this.shooting,
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
		let iddleAnimation = AnimationsFactory.newAnimation('idle', '../img/meteor/meteor', 100, 30, true, 0)
		let deadAnimation = AnimationsFactory.newAnimation('dead', '../img/sfx/explosion', 150, 13, false, 1)

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
					animations: Object.keys(this.animations).map( key => this.animations[key].frame ),
					ai: this.animation.animationIndex,
					fi: this.animation.frameIndex
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