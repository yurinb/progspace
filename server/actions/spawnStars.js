const StarFactory = require('../models/Star')

const quadrantSize = 250
const starsByQuadrant = 50

let tests = {
    quadrantFactory: [{
            id: 1,
            test: getQuadrantPositionBy(0, 0),
            assert: {
                x: 0,
                y: 0
            }
        },
        {
            id: 2,
            test: getQuadrantPositionBy(500, 299),
            assert: {
                x: 0,
                y: 0
            }
        },
        {
            id: 3,
            test: getQuadrantPositionBy(1001, 500),
            assert: {
                x: 1000,
                y: 0
            }
        },
        {
            id: 4,
            test: getQuadrantPositionBy(-94, 101),
            assert: {
                x: -1000,
                y: 0
            }
        }, ,
        {
            id: 5,
            test: getQuadrantPositionBy(5600, -3900),
            assert: {
                x: 5000,
                y: -4000
            }
        },
        {
            id: 6,
            test: getQuadrantPositionBy(600, -500),
            assert: {
                x: 0,
                y: -1000
            }
        }
    ],

}

function test() {
    let fails = []
    tests.quadrantFactory.forEach(element => {
        if (element.test !== element.assert) {
            fails.push({
                element: JSON.stringify(element),
                return: element.test
            })
        }
    });
    return fails
}

console.log(test());


// creates a quadrant to be used to fit stars in
function getQuadrantPositionBy(x, y) {
    let quadrant = {
        x: 0,
        y: 0
    }
    if (x > 0) {
        if (x <= quadrantSize) {
            quadrant.x = 0
        }
        if (x > quadrantSize) { 
            quadrant.x = (Math.trunc(x / quadrantSize) * quadrantSize)
            // let quadX = Math.trunc(x / quadrantSize)
            // quadrant.x = quadX * quadrantSize
        }
    }
    if (x < 0) {
        if (x >= -(quadrantSize)) { 
            quadrant.x = -(quadrantSize)
        }
        if (x < -(quadrantSize)) {
            quadrant.x = (Math.trunc(x / quadrantSize) * quadrantSize) - quadrantSize
            // let quadX = Math.trunc(x / -(quadrantSize))
            // quadrant.x = -(quadX * (quadrantSize * 2))
        }
    }
    if (y > 0) {
        if (y <= quadrantSize) {
            quadrant.y = 0
        }
        if (y > quadrantSize) {
            quadrant.y = (Math.trunc(y / quadrantSize) * quadrantSize)
            // let quadY = Math.trunc(y / quadrantSize)
            // quadrant.y = quadY
        }
    }

    if (y < 0) {
        if (y >= -(quadrantSize)) {
            quadrant.y = -(quadrantSize)
        }
        if (y < -(quadrantSize)) {
            quadrant.y = (Math.trunc(y / quadrantSize) * quadrantSize) - quadrantSize
            // let quadY = Math.trunc(x / -(quadrantSize))
            // quadrant.y = -(quadX * (quadrantSize * 2))
        }
    }

    return quadrant
}

// searchs for quadrant at quadrants array
function getQuadrantByPosition(x, y) {
    let quadrant = getQuadrantPositionBy(x, y)
    //console.log('QUAD POS : ' + x + ' - ' + y + ' > ', quadrant);

    let found = false
    for (let index = 0; index < global.gameObjects.starsQuadrant.length; index++) {
        let element = global.gameObjects.starsQuadrant[index]

        if (element.x == quadrant.x && element.y == quadrant.y) {
            found = true
            return element
        }
    }
    return getNewQuadrant(x, y)

}

function getNewQuadrant(x, y) {
    //console.log('NEW QUADRANT');

    // get a example quadrant that shold have in memory based on x, y
    let quadrant = getQuadrantPositionBy(x, y)

    quadrant.size = quadrantSize
    quadrant.stars = []
    for (let index = 0; index < starsByQuadrant; index++) {
        quadrant.stars.push(StarFactory.newStar(quadrant))
    }

    let globalQuadrant = global.gameObjects.starsQuadrant
    if (globalQuadrant.length > 0) {
        for (let index = 0; index < globalQuadrant.length; index++) {
            if (globalQuadrant[index].x != quadrant.x || globalQuadrant[index].y != quadrant.y) {
                globalQuadrant.push(quadrant)
                break
            }
        }
    } else {
        
        globalQuadrant.push(quadrant)
    }

    return quadrant
}

module.exports = {
    getQuadrantByPosition
}