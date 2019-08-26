const PhysicObjectFactory = require('./PhysicObject')
const collideObjects = require('../actions/collide-objects')
const AnimationsFactory = require('./Animation')
const Animate = require('../actions/animate')

function newProjetil(username) {
	let physicProjetil = PhysicObjectFactory.newPhysicObject()
	
	let objectProperties = {
		state: 'alive',
		username,
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
				x: this.x,
				y: this.y,
				h: this.w,
				w: this.h,
				angle: this.angle,
				animations: Object.keys(this.animations).map( key => this.animations[key].frame ),
				ai: this.animation.animationIndex,
				fi: this.animation.frameIndex,
			}
		}
	}

	let projetil = Object.assign(physicProjetil, objectProperties)


	return projetil
}

module.exports = {
    
    
	newLaser: function (username) {
		let idleProjetilAnimation = AnimationsFactory.newAnimation('idle', '../img/projetils/projetil', 100, 1, true, 0)
		let deadProjetilAnimation = AnimationsFactory.newAnimation('dead', '../img/sfx/explosion', 50, 13, false, 1)

		let projetil = newProjetil(username)
		
		let objectProperties = {
			damage: 25,
			speed: 125,
			energy: 5000,
			energyCost: 5,
			w: 35,
			h: 85,
			animation: idleProjetilAnimation,
			animations: {
				idle: idleProjetilAnimation, 
				dead: deadProjetilAnimation
			},
			
		}

		projetil = {...projetil, ...objectProperties}

		Animate.animate(projetil)

		return projetil
	},



}