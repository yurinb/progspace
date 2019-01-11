let starCount = -1

module.exports = {

    newStar: function (quadrant) {
        starCount++
        let object = {
            id: starCount,
            x: quadrant.x + Math.random() * quadrant.size,
            y: quadrant.y + Math.random() * quadrant.size,
            z: Math.random() * 3,
            r: Math.random() * 255,
            g: Math.random() * 255,
            b: Math.random() * 255,
            s: Math.random() * 5,
        }
        return object
    }

}