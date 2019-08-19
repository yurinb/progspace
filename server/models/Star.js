let starCount = 0

module.exports = {

	newStar: function (quadrant) {
		let object = {
			id: starCount,
			x: quadrant.x + Math.random() * quadrant.w,
			y: quadrant.y + Math.random() * quadrant.h,
			z: 0.25 + Math.random() * 1, // deep
			r: Math.random() * 255 * 0.50, // red
			g: Math.random() * 255 * 0.50, // green
			b: Math.random() * 255 * 0.50, // blue
			s: Math.random() * 2, // size
		}
		starCount++
		return object
	}

}