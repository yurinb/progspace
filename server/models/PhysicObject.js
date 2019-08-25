let objectCount = 0

module.exports = {


	newPhysicObject: function () {
		let object = {
			id: objectCount,
			x: 0,
			y: 0,
			w: 10,
			h: 10,
			angle: 0,
			state: 'alive',
			isVanish: false,
			dies: function() {
				this.state = 'dead'
				this.animation = this.animations.dead
				if (this.isPlayer) console.log('Player', this.username, 'Dies.')
				if (this.isPlayer) this.propulsor.state = 'removible'
				setTimeout(() => this.state = 'removible', this.animation.interval * this.animation.frames.length)
			},
			remove: function() {
				this.state = 'removible'
				if (this.isPlayer) this.propulsor.state = 'removible'
			},
			vanishIn: function(ms) {
				if (this.isVanish) return
				this.isVanish = true
				const reducerW = Math.floor(this.w / (ms / 100))
				const reducerH = Math.floor(this.h / (ms / 100))
				const intervalID = setInterval(() => {
					this.w -= reducerW
					this.h -= reducerH
					if (this.w <= 0 && this.h <= 0) {
						this.remove()
						clearInterval(intervalID)
					}
				}, 100)
			},
			appearIn: function(ms) {
				const w = this.w
				const h = this.h
				const incrementW = w / (ms / 100)
				const incrementH = h / (ms / 100)
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