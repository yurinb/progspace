let starCount = 0

module.exports = {

	newStar: function (quadrant) {
		let object = {
			id: starCount,
			x: Math.floor(quadrant.x + Math.random() * quadrant.w),
			y: Math.floor(quadrant.y + Math.random() * quadrant.h),
			z: 1 + Math.random() * 2, // deep/parallax
			r: Math.floor(Math.random() * 255), // red
			g: Math.floor(Math.random() * 255), // green
			b: Math.floor(Math.random() * 255), // blue
			s: 0.5 + Math.random() * 1, // size/light force
		}
		starCount++
		return object
	}

}