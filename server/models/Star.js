let starCount = -1

module.exports = {

    newStar: function (quadrant) {
        starCount++
        let object = {
            id: starCount,
            x: quadrant.x + Math.random() * quadrant.size,
            y: quadrant.y + Math.random() * quadrant.size,
            z: 0.50 + Math.random() * 1,
            r: Math.random() * 200,
            g: Math.random() * 200,
            b: Math.random() * 200,
            s: Math.random() * 5,
        }
        return object
    }

}