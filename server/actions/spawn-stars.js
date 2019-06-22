const StarFactory = require('../models/Star')

const cache = 10

// creates a quadrant to be used to fit stars in
function getQuadrantPositionBy(x, y, playerResolution) {
    let quadrant = {
        x: 0,
        y: 0
    }
    if (x > 0) {
        if (x <= playerResolution.w) {
            quadrant.x = 0
        }
        if (x > playerResolution.w) {
            quadrant.x = (Math.trunc(x / playerResolution.w) * playerResolution.w)
        }
    }
    if (x < 0) {
        if (x >= -(playerResolution.w)) {
            quadrant.x = -(playerResolution.w)
        }
        if (x < -(playerResolution.w)) {
            quadrant.x = (Math.trunc(x / playerResolution.w) * playerResolution.w) - playerResolution.w
        }
    }
    if (y > 0) {
        if (y <= playerResolution.h) {
            quadrant.y = 0
        }
        if (y > playerResolution.h) {
            quadrant.y = (Math.trunc(y / playerResolution.h) * playerResolution.h)
        }
    }

    if (y < 0) {
        if (y >= -(playerResolution.h)) {
            quadrant.y = -(playerResolution.h)
        }
        if (y < -(playerResolution.h)) {
            quadrant.y = (Math.trunc(y / playerResolution.h) * playerResolution.h) - playerResolution.h
        }
    }
    return quadrant
}

// searchs for quadrant at quadrants array
function getQuadrantByPosition(x, y, playerResolution) {
    let quadrant = getQuadrantPositionBy(x, y, playerResolution)

    for (let index = 0; index < global.gameObjects.starsQuadrant.length; index++) {
        let element = global.gameObjects.starsQuadrant[index]

        if (element.x == quadrant.x && element.y == quadrant.y) {
            return element
        }
    }
    return getNewQuadrant(x, y, playerResolution)

}

function getNewQuadrant(x, y, playerResolution) {

    // get a example quadrant that shold have in memory based on x, y
    let quadrant = getQuadrantPositionBy(x, y, playerResolution)

    quadrant.w = playerResolution.w
    quadrant.h = playerResolution.h

    quadrant.stars = []

    const starsByQuadrant = Math.floor((quadrant.w + quadrant.h) / 150)

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

function getNewVisibleQuadrants(x, y, playerQuadrants, playerResolution) {

    let quadrants = []

    if (quadrants.length == 0) {
        quadrants = getQuadrant(x, y, playerQuadrants, playerResolution)
    }

    if (quadrants.length == 0) {
        quadrants = getQuadrant(x + playerResolution.w / 2, y, playerQuadrants, playerResolution)
    }

    if (quadrants.length == 0) {
        quadrants = getQuadrant(x - playerResolution.w / 2, y, playerQuadrants, playerResolution)
    }

    if (quadrants.length == 0) {
        quadrants = getQuadrant(x, y + playerResolution.h / 2, playerQuadrants, playerResolution)
    }

    if (quadrants.length == 0) {
        quadrants = getQuadrant(x, y - playerResolution.h / 2, playerQuadrants, playerResolution)
    }


    if (quadrants.length == 0) {
        quadrants = getQuadrant(x + playerResolution.w / 2, y  + playerResolution.h / 2, playerQuadrants, playerResolution)
    }

    if (quadrants.length == 0) {
        quadrants = getQuadrant(x - playerResolution.w / 2, y  + playerResolution.h / 2, playerQuadrants, playerResolution)
    }

    if (quadrants.length == 0) {
        quadrants = getQuadrant(x  + playerResolution.w / 2, y - playerResolution.h / 2, playerQuadrants, playerResolution)
    }
    
    if (quadrants.length == 0) {
        quadrants = getQuadrant(x  - playerResolution.w / 2, y - playerResolution.h / 2, playerQuadrants, playerResolution)
    }

    return quadrants

}

function getQuadrant(x, y, playerQuadrants, playerResolution) {
    let quadrants = []
    let startX = x + playerResolution.w / 2
    let startY = y + playerResolution.h / 2
    for (let quad = 1; quad <= 4; quad++) {
        if (quad == 2) {
            x = startX - playerResolution.w / 2
            y = startY
        }
        if (quad == 3) {
            x = startX - playerResolution.w / 2
            y = startY - playerResolution.h / 2
        }
        if (quad == 4) {
            x = startX
            y = startY - playerResolution.h / 2
        }

        let newQuadrant = getQuadrantByPosition(x, y, playerResolution)

        if (playerQuadrants.length > 0) {
            let found = false
            // verifica se o quadrante ja existe no client
            for (let index = 0; index < playerQuadrants.length; index++) {
                if (playerQuadrants[index].x == newQuadrant.x && playerQuadrants[index].y == newQuadrant.y) {
                    found = true
                }
            }
            // se nao existe, coloca no array para enviar
            if (!found) {
                // poe um limite na memoria de quadrantes que um player pode segurar
                if (playerQuadrants.length >= cache) {
                    playerQuadrants.pop()
                }
                playerQuadrants.unshift(newQuadrant)
                quadrants.push(newQuadrant)
            }
        } else {
            playerQuadrants.push(newQuadrant)
            quadrants.push(newQuadrant)
        }
    }
    return quadrants
}

module.exports = {
    getNewVisibleQuadrants
}