const spawnStars = require('./spawnStars')
const BulletFactory = require('../models/Bullet')

const intervalMS = 30

function moveBullet(element) {
    if (element.state != "removible") {

        elementCollidesWithShip(element, shipCollided => {
            bulletDies(element)
            console.log('collided');
            shipCollided.energy -= element.damage
            if (shipCollided.energy <= 0) {
                shipCollided.state = 'dead'
            }
        })

        if (element.speed > 0) {
            element.x += (element.speed + element.shipAcelerated) * Math.cos(element.angle * Math.PI / 180);
            element.y += (element.speed + element.shipAcelerated) * Math.sin(element.angle * Math.PI / 180);
        }
    }
    if (element.lifeTime > 0) {
        element.lifeTime -= intervalMS
    }
}

function moveShips(element) {
    if (element.engineOn) {
        if (element.acelerated <= element.speed) {
            element.acelerated += element.aceleration * 0.1
        }
        if (element.impulseOn) {
            let energyCost = element.maxEnergy * 0.01 * 0.25
            if (element.energy >= energyCost) {
                element.energy -= energyCost
                let maxAcceleration = 10
                if (element.acelerated <= element.speed * maxAcceleration) {
                    element.acelerated += element.aceleration * 0.1 * 1.5
                }
            } else {
                element.impulseOn = false
                //element.acelerated /= 3
            }
        }
    } else {
        if (element.acelerated > 0) {
            element.acelerated -= element.aceleration * 0.25
        } else {
            element.acelerated = 0
        }
    }

    element.x += element.acelerated * Math.cos(element.angle * Math.PI / 180);
    element.y += element.acelerated * Math.sin(element.angle * Math.PI / 180);
    if (element.state == 'dead') {
        shipDies(element)
    }
}

function shipDies(elem) {
    elem.modelImg = 'dead'
}

function bulletDies(elem) {
    elem.state = "removible"
}

function elementCollidesWithShip(element, collidedWith) {
    let eC = {
        x: element.x,
        y: element.y,
        r: (element.w + element.h) / 3
    }
    for (let i = 0; i < global.gameObjects.ships.length; i++) {
        let ship = global.gameObjects.ships[i]
        if (element.username != ship.username) {
            let sC = {
                x: ship.x,
                y: ship.y,
                r: (ship.w + ship.h) / 3
            }

            if (collision(eC.x, eC.y, eC.r, sC.x, sC.y, sC.r)) {
                collidedWith(ship)
            }
        }
    }
    return false
}

function collision(p1x, p1y, r1, p2x, p2y, r2) {
    var a;
    var x;
    var y;

    a = r1 + r2;
    x = p1x - p2x;
    y = p1y - p2y;

    if (a > Math.sqrt((x * x) + (y * y))) {
        return true;
    } else {
        return false;
    }
}

//collides rectangle
// function elementCollidesWithShip(element) {

//     let ships = global.gameObjects.ships
//     let eMinX = element.x - element.w / 2
//     let eMaxX = element.x + element.w / 2
//     let eMinY = element.y - element.h / 2
//     let eMaxY = element.y + element.h / 2
//     for (let index = 0; index < ships.length; index++) {
//         let sMinX = ships[index].x - ships[index].w / 2
//         let sMaxX = ships[index].x + ships[index].w / 2
//         let sMinY = ships[index].y - ships[index].h / 2
//         let sMaxY = ships[index].y + ships[index].h / 2
//         if (
//             eMaxX >= sMinX &&
//             eMinX <= sMaxX &&
//             eMaxY >= sMinY &&
//             eMinY <= sMaxY
//         ) {
//             return true
//         }
//     }
//     return false
// }

setTimeout(() => {
    setInterval(function shipsMove() {
        global.gameObjects.ships.forEach(element => {
            moveShips(element)
        });
        global.io.emit('ships', global.gameObjects.ships)
    }, intervalMS);
}, 0);

setTimeout(() => {
    setInterval(function bulletMove() {
        let index = 0
        let indexesToRemove = []
        global.gameObjects.bullets.forEach(element => {
            if (element.lifeTime <= 0 && element.state == 'alive') {
                element.state = "dead"
            }
            if (element.state == "dead") {
                bulletDies(element)
            }
            if (element.state == "removible") {
                indexesToRemove.push(index)
            }
            if (element.lifeTime > 0 && element.state == 'alive') {
                moveBullet(element)
            }
            index++
        });
        let updatedBullets = global.gameObjects.bullets.filter((value, index) => {
            let bulletAlive = true
            indexesToRemove.forEach(i => {
                if (bulletAlive) {
                    if (i == index) {
                        bulletAlive = false
                    }
                }
            });
            return bulletAlive
        })
        global.gameObjects.bullets = updatedBullets
        global.io.emit('bullets', global.gameObjects.bullets)
    }, intervalMS);
}, 10);

setTimeout(() => {
    setInterval(() => {
        global.gameObjects.clients.forEach(elem => {
            if (elem.player) {
                elem.socket.emit('stars', spawnStars.getNewVisibleQuadrants(elem.player.ship.x, elem.player.ship.y, elem.player.stars))
            }
        })
    }, intervalMS);
}, 20);