const spawnStars = require('./spawnStars')

const intervalMS = 30

function moveElement(elem) {
    elem.x += elem.speed * Math.cos(elem.angle * Math.PI / 180);
    elem.y += elem.speed * Math.sin(elem.angle * Math.PI / 180);
}

setInterval(function moveShips() {
    global.gameObjects.ships.forEach(element => {
        moveElement(element)
    });
    global.io.emit('ships', global.gameObjects.ships)
}, intervalMS);

setInterval(() => {
    global.gameObjects.bullets.forEach(element => {
        moveElement(element)
    });
    global.io.emit('bullets', global.gameObjects.bullets)
}, intervalMS);

setInterval(() => {
    global.gameObjects.clients.forEach(elem => {
        if (elem.player) {
            elem.socket.emit('stars', spawnStars.getNewVisibleQuadrants(elem.player.ship.x, elem.player.ship.y, elem.player.stars))
        }
    })
}, 100);