const PhysicObjectFactory = require('./PhysicObject')
const Animate = require('../actions/animate')
const collideObjects = require('../actions/collide-objects')
const WeaponFactory = require('./Weapon')
const AnimationsFactory = require('./Animation')

module.exports = {


	newShip: function (username) {
		const physicObject = PhysicObjectFactory.newPhysicObject()

		const iddleAnimation = AnimationsFactory.newAnimation({
			state: 'idle', 
			frame: '../img/units/unit', 
			interval: 9999, 
			maxIndex: 1, 
			repeat: true, 
			animationIndex: 0
		})
			
		const deadAnimation = AnimationsFactory.newAnimation({
			state: 'dead', 
			frame: '../img/sfx/explosion', 
			interval: 150, 
			maxIndex: 13, 
			repeat: false, 
			animationIndex: 1
		})
			
		const propulsorAnimation = AnimationsFactory.newAnimation({
			state: 'idle', 
			frame: '../img/sfx/propulsor', 
			interval: 150, 
			maxIndex: 2, 
			repeat: true, 
			animationIndex: 0
		})

		const objectProperties = {
			username,
			isPlayer: true,
			w: 100,
			h: 100,
			speed: 150,
			aceleration: 5,
			acelerated: 0,
			velY: 0,
			velX: 0,
			engineOn: false,
			shooting: false,
			score: {asteroids: 0, kills: 0, score: 0},
			propulsor: {
				isPropulsor: true,
				on: false,
				animation: propulsorAnimation,
				animations: [propulsorAnimation]
			},
			maxEnergy: 1000,
			energy: 1000,
			reactorSpeed: 1,
			weapons: [WeaponFactory.laser2(physicObject.id)],
			currentWeaponIndex: 0,
			state: 'alive',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			},
			asteroidCollided: null,
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
						if (this.angle - moveAngle < 60 && this.angle - moveAngle > -60) {
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
					state: this.state,
					x: this.x,
					y: this.y,
					h: this.w,
					w: this.h,
					a: this.angle,
					maxEnergy: this.maxEnergy,
					energy: this.energy,
					score: this.score,
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

		const unit = Object.assign(physicObject, objectProperties)

		Animate.animate(unit)
		Animate.animate(unit.propulsor)

		return unit
	},


	newAsteroid: function (x, y) {
		const iddleAnimation = AnimationsFactory.newAnimation({
			state: 'idle', 
			frame: '../img/asteroid/asteroid', 
			interval: 125, 
			maxIndex: 30, 
			repeat: true, 
			animationIndex: 0
		})
		
		const deadAnimation = AnimationsFactory.newAnimation({
			state: 'dead', 
			frame: '../img/sfx/explosion', 
			interval: 150, 
			maxIndex: 13, 
			repeat: false, 
			animationIndex: 1
		})
			
		const size = 350 + Math.floor(Math.random() * 1250)

		const objectProperties = {
			username: '',
			isAsteroid: true,
			w: size,
			h: size,
			angle: Math.floor(Math.random() * 360),
			speed: 15 + Math.floor(Math.random() * 125),
			energy: 250 + size * 2,
			reactorSpeed: 0,
			state: 'alive',
			animation: iddleAnimation,
			animations: {
				iddle: iddleAnimation,
				dead: deadAnimation
			},
			// move dead unit together with asteroid
			// unitsCollided: [],
			move: function () {
				if (this.state != 'alive') return

				const collided = collideObjects.elementCollidesWithShip(this, unitCollided => {
					if (unitCollided.state == 'alive') {
						// move dead unit together with asteroid
						// if (unitCollided.isPlayer) {
							// 	unitCollided.unitCollidedDiffX = this.x - unitCollided.x
						// 	unitCollided.unitCollidedDiffY = this.y - unitCollided.y
						// 	this.unitsCollided.push(unitCollided)
						// }
						if (unitCollided.isAsteroid) {
							let thisSize = this.w + this.h
							collidedSize = unitCollided.w + unitCollided.h
							if (collidedSize > thisSize * 2)  // die if another asteroid is 2x bigger
								this.dies()
							else if (collidedSize < thisSize / 2) 
								unitCollided.dies()
							else {
								this.dies()
								unitCollided.dies()
							}
						} else {
							unitCollided.dies()
						}
					}
				})

				if (!collided) {
					this.x += Math.floor(this.speed * Math.cos(this.angle * Math.PI / 180))
					this.y += Math.floor(this.speed * Math.sin(this.angle * Math.PI / 180))
					// move dead unit together with asteroid
					// this.unitsCollided.forEach((unit, i) => {
					// 	if (unit.state == 'dead') {
					// 		unit.x = this.x - unit.unitCollidedDiffX
					// 		unit.y = this.y - unit.unitCollidedDiffY
					// 	} else {
					// 		delete this.unitsCollided[i]
					// 	}
					// })
				}
			},
			getClientVariables: function() {
				return {
					id: this.id,
					x: this.x,
					y: this.y,
					h: this.w,
					w: this.h,
					a: this.angle,
					isAsteroid: this.isAsteroid,
					animations: Object.keys(this.animations).map( key => this.animations[key].frame ),
					ai: this.animation.animationIndex,
					fi: this.animation.frameIndex
				}
			}
		}
		const physicObject = PhysicObjectFactory.newPhysicObject()

		const unit = Object.assign(physicObject, objectProperties)

		unit.x = x
		unit.y = y

		Animate.animate(unit)

		return unit
	}



}