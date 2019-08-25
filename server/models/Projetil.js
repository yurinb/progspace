const PhysicObjectFactory = require('./PhysicObject')
const collideObjects = require('../actions/collide-objects')
const AnimationsFactory = require('./Animation')
const Animate = require('../actions/animate')


module.exports = {
    
    
	newLaser: function (username) {
		let physicProjetil = PhysicObjectFactory.newPhysicObject()
		let idleProjetilAnimation = AnimationsFactory.newAnimation('idle', ['../img/projetils/projetil1.png'], 100, true)
		let deadProjetilAnimation = AnimationsFactory.newAnimation('dead',
			['../img/sfx/explosion1.png', '../img/sfx/explosion2.png', '../img/sfx/explosion3.png', '../img/sfx/explosion4.png', '../img/sfx/explosion5.png', '../img/sfx/explosion6.png',
				'../img/sfx/explosion7.png', '../img/sfx/explosion8.png', '../img/sfx/explosion9.png', '../img/sfx/explosion10.png', '../img/sfx/explosion11.png', '../img/sfx/explosion12.png', '../img/sfx/explosion13.png'
			], 50, false)

		let objectProperties = {
			damage: 25,
			speed: 125,
			energy: 5000,
			color: '#ffffff',
			modelImg: 1,
			w: 50,
			h: 100,
			energyCost: 5,
			username,
			unitAcelerated: 0,
			state: 'alive',
			animation: idleProjetilAnimation,
			animations: {
				idle: idleProjetilAnimation, 
				dead: deadProjetilAnimation
			},
			move: function () {
				if (this.state == 'alive') {
			
					collideObjects.elementCollidesWithShip(this, unitCollided => {
						if (unitCollided.state == 'alive') {
							this.dies()
							this.w = this.h * 3
							this.h = this.h * 3
							unitCollided.energy -= this.damage
							if (unitCollided.energy <= 0) {
								unitCollided.dies()
							}
						}
					})
					
					if (this.energy > 0) {
						this.energy -= this.speed + this.unitAcelerated
						if (this.speed > 0) {
							this.x += Math.floor((this.speed + this.unitAcelerated) * Math.cos(this.angle * Math.PI / 180))
							this.y += Math.floor((this.speed + this.unitAcelerated) * Math.sin(this.angle * Math.PI / 180))
						}
					} else {
						if (this.state == 'alive')
						// this.dies()
						this.vanishIn(200)
					}
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
					frame: this.animation.frame,
				}
			}
		}

		let projetil = Object.assign(physicProjetil, objectProperties)

		Animate.animate(projetil)

		return projetil
	},



}