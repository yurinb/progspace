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
			lifeTime: 3000
		}
		objectCount++
		return object
	}


}