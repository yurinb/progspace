const PhysicObjectFactory = require('./PhysicObject')
const collideObjects = require('../actions/collide-objects')
const AnimationsFactory = require('./Animation')
const Animate = require('../actions/animate')


module.exports = {
    
    
	newLaser: function (username) {
		let physicProjetil = PhysicObjectFactory.newPhysicObject()
		let idleProjetilAnimation = AnimationsFactory.newAnimation('idle', '../img/projetils/projetil', 100, 1, true, 0)
		let deadProjetilAnimation = AnimationsFactory.newAnimation('dead', '../img/sfx/explosion', 50, 13, false, 1)

		let objectProperties = {
			damage: 25,
			speed: 125,
			energy: 5000,
			color: '#ffffff',
			modelImg: 1,
			w: 35,
			h: 85,
			energyCost: 5,
			username,
			unitAcelerated: 0,
			state: 'alive',
			animation: idleProjetilAnimation,
			animations: {
				idle: idleProjetilAnimation, 
				dead: deadProjetilAnimation
			},
			unitCollided: null,
			move: function () {
				if (this.state == 'alive') {
			
					collideObjects.elementCollidesWithShip(this, unitCollided => {
						if (unitCollided.state == 'alive') {
							this.dies()
							this.w = this.h * 3
							this.h = this.h * 3
							this.unitCollided = unitCollided
							this.unitCollided.diffX = this.unitCollided.x - this.x
							this.unitCollided.diffY = this.unitCollided.y - this.y
							unitCollided.energy -= this.damage
							if (unitCollided.energy <= 0) {
								unitCollided.dies()
							}
						}
					})
					
					if (this.energy > 0 || this.isVanish) {
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
					this.x = this.unitCollided.x - this.unitCollided.diffX
					this.y = this.unitCollided.y - this.unitCollided.diffY
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

		Animate.animate(projetil)

		return projetil
	},



}