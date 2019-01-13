let starCount = -1

module.exports = {

    newStar: function (quadrant) {
        starCount++
        let object = {
            id: starCount,
            x: quadrant.x + Math.random() * quadrant.size,
            y: quadrant.y + Math.random() * quadrant.size,
            z: 0.25 + Math.random() * 1,
            r: Math.random() * 255 * 0.90,
            g: Math.random() * 255 * 0.50,
            b: Math.random() * 255 * 0.90,
            s: Math.random() * 10,
        }
        return object
    }

}