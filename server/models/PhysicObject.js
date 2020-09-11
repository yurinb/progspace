let objectCount = 0

module.exports = {


	newPhysicObject: function () {
		let object = {
			id: objectCount,
			x: 0,
			y: 0,
			w: 10,
			h: 10,
			initialW: null,
			initialH: null,
			angle: 0,
			state: 'alive',
			isVanish: false,
			dies: function() {
				if (this.initialW) {
					this.w = this.initialH 
					this.h = this.initialH
				}
				this.state = 'dead'
				this.animation = this.animations.dead
				this.animation.animationIndex = Object.keys(this.animations).map(key => this.animations[key]).indexOf(this.animation)
				if (this.isPlayer) {
					console.log('Player', this.username, 'has been destroyed by.')
					this.w = this.h * 5
					this.h = this.h * 5
					this.propulsor.on = false
					this.propulsor.state = 'removible'
				}
				setTimeout(() => this.state = 'removible', this.animation.interval * this.animation.maxIndex)
			},
			remove: function() {
				this.state = 'removible'
				if (this.isPlayer) this.propulsor.state = 'removible'
			},
			vanishIn: function(ms) {
				if (this.isVanish) return
				if (!this.initialW) {
					this.initialW = this.w
					this.initialH = this.h
				}
				const reducerW = Math.floor(this.w / (ms / 100))
				const reducerH = Math.floor(this.h / (ms / 100))
				const intervalID = setInterval(() => {
					if (this.state == 'dead') {
						// this.w -= this.initialW // explodes with full size
						// this.h -= this.initialH // explodes with full size
						clearInterval(intervalID)
						return
					}
					if (this.w <= 0 && this.h <= 0) {
						this.remove()
						clearInterval(intervalID)
						return
					}
					this.w -= reducerW
					this.h -= reducerH
				}, 100)
				this.isVanish = true
			},
			appearIn: function(ms) {
				const w = this.w
				const h = this.h
				const incrementW = Math.floor(w / (ms / 100))
				const incrementH = Math.floor(h / (ms / 100))
				this.w = 0
				this.h = 0
				const intervalID = setInterval(() => {
					this.w += incrementW
					this.h += incrementH
					if (this.w >= w && this.h >= h) {
						clearInterval(intervalID)
					}
				}, 100)
			}
		}
		objectCount++
		return object
	}


}