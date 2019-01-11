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