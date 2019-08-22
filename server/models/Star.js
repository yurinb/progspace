let starCount = 0

module.exports = {

	newStar: function (quadrant) {
		let object = {
			id: starCount,
			x: quadrant.x + Math.random() * quadrant.w,
			y: quadrant.y + Math.random() * quadrant.h,
			z: 0.50 + Math.random() * 2, // deep
			r: Math.random() * 255 * 0.75, // red
			g: Math.random() * 255 * 0.75, // green
			b: Math.random() * 255 * 0.75, // blue
			s: Math.random() * 1.5, // size
		}
		starCount++
		return object
	}

}