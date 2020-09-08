const PhysicObjectFactory = require('./PhysicObject')
const collideObjects = require('../actions/collide-objects')
const AnimationsFactory = require('./Animation')
const Animate = require('../actions/animate')

function newProjetil(ownerID) {
	let physicProjetil = PhysicObjectFactory.newPhysicObject()
	
	let objectProperties = {
		name: 'projectile',
		state: 'alive',
		ownerID,
		damage: 10,
		speed: 100,
		energy: 5000,
		energyCost: 5,
		w: 50,
		h: 50,
		unitAcelerated: 0,
		unitCollided: null,
		move: function () {
			if (this.state == 'alive') {
		
				collideObjects.elementCollidesWithShip(this, unitCollided => {
					if (unitCollided.state == 'alive') {
						this.dies()
						this.w = this.h * 1.5
						this.h = this.h * 1.5
						this.unitCollided = unitCollided
						this.unitCollidedDiffX = this.unitCollided.x - this.x
						this.unitCollidedDiffY = this.unitCollided.y - this.y
						unitCollided.energy -= this.damage
						if (unitCollided.energy <= 0) {
							unitCollided.dies()
							if (unitCollided.isAsteroid) {
								global.gameObjects.units[this.ownerID].score.asteroids++
								global.gameObjects.units[this.ownerID].score.score+= 50
							}
							if (unitCollided.isPlayer) {
								global.gameObjects.units[this.ownerID].score.kills++
								global.gameObjects.units[this.ownerID].score.score+= 1000
							}
						}
					}
				})
				
				if (this.state == 'alive' && this.energy > 0 || this.isVanish) {
					this.energy -= this.speed + this.unitAcelerated
					if (this.speed > 0) {
						this.x += Math.floor((this.speed + this.unitAcelerated) * Math.cos(this.angle * Math.PI / 180))
						this.y += Math.floor((this.speed + this.unitAcelerated) * Math.sin(this.angle * Math.PI / 180))
					}
				} else {
					if (this.state == 'alive')
					// this.dies()
					this.vanishIn(500)
				}
			} else if (this.unitCollided) {
				this.x = this.unitCollided.x - this.unitCollidedDiffX
				this.y = this.unitCollided.y - this.unitCollidedDiffY
			}
		},
		getClientVariables: function() {
			return {
				id: this.id,
				name: this.name,
				x: this.x,
				y: this.y,
				h: this.w,
				w: this.h,
				isVanish: this.isVanish,
				state: this.state,
				owner: this.ownerID,
				a: this.angle,
				animations: Object.keys(this.animations).map( key => this.animations[key].frame ),
				ai: this.animation.animationIndex,
				fi: this.animation.frameIndex,
			}
		}
	}

	let projectile = Object.assign(physicProjetil, objectProperties)


	return projectile
}

module.exports = {
    
    
	plasma: function (ownerID) {
		const idleProjetilAnimation = AnimationsFactory.newAnimation({
			state: 'idle', 
			frame: '../img/projectiles/projectile', 
			interval: 100, 
			maxIndex: 1, 
			repeat: true, 
			animationIndex: 0
		})

		const deadProjetilAnimation = AnimationsFactory.newAnimation({
			state: 'dead', 
			frame: '../img/sfx/explosion', 
			interval: 50, 
			maxIndex: 13, 
			repeat: false, 
			animationIndex: 1
		})
			
		let projectile = newProjetil(ownerID)
		
		const objectProperties = {
			name: 'plasma',
			damage: 25,
			speed: 200,
			energy: 5000,
			energyCost: 5,
			w: 25,
			h: 60,
			animation: idleProjetilAnimation,
			animations: {
				idle: idleProjetilAnimation, 
				dead: deadProjetilAnimation
			},
			
		}

		projectile = {...projectile, ...objectProperties}

		Animate.animate(projectile)

		return projectile
	},


	laser: function (ownerID) {
		const idleProjetilAnimation = AnimationsFactory.newAnimation({
			state: 'idle', 
			frame: '../img/projectiles/projectile', 
			interval: 100, 
			maxIndex: 1, 
			repeat: true, 
			animationIndex: 0
		})
		const deadProjetilAnimation = AnimationsFactory.newAnimation({
			state: 'dead', 
			frame: '../img/sfx/explosion', 
			interval: 50, 
			maxIndex: 13, 
			repeat: false, 
			animationIndex: 1
		})

		let projectile = newProjetil(ownerID)
		
		const objectProperties = {
			name: 'laser',
			damage: 25,
			speed: 200,
			energy: 5000,
			energyCost: 5,
			w: 25,
			h: 60,
			animation: idleProjetilAnimation,
			animations: {
				idle: idleProjetilAnimation, 
				dead: deadProjetilAnimation
			},
			
		}

		projectile = {...projectile, ...objectProperties}

		Animate.animate(projectile)

		return projectile
	},




}