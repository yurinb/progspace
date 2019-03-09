// Returns x and y of mouse position on canvas screen
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Returns the angle between player ship and mouse-canvas position
function getPlayerAngle() {
    let ship = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
    let mouse = {
        x: mousePosition.x,
        y: mousePosition.y
    };
    let angle = Math.atan2(mouse.y - ship.y, mouse.x - ship.x) * 180 / Math.PI;
    if (angle < 0) {
        angle += 360
    }

    return angle
}

// zoom variable is used on next method(convertPosToPixel)
// when less the number, more objects will fit on screen
let zoom = 0.25
window.addEventListener('mousewheel', function (e) {
    if (e.wheelDelta < 0 && zoom > 0.10) {
        zoom -= 0.05;
    } else if (e.wheelDelta > 0 && zoom < 1) {
        zoom += 0.05;
    }
});

// Convert and returns the position of objects to fit in screen
// every object has postions, but to show up on screen they have to be close to player ship
// if player ship position is x3000 y5000 and screen have max x = 1366 y = 766
// the position x3000 y5000 will be equivalent to screen x = 1366/2 y = 766/2
// so, player ship is allways at x1366/2 y = 766/2
// objects that position is close enough of real player ship and match max screen size will show up
function convertPosToPixel(x, y, playerShip) { // 

    let canvasCenterX = canvas.width / 2
    let canvasCenterY = canvas.height / 2

    let diffX = (x - playerShip.x) * zoom
    let diffY = (y - playerShip.y) * zoom

    return {
        //x: diffX + canvasCenterX,
        //y: diffY + canvasCenterY
        x: Math.floor(diffX + canvasCenterX),
        y: Math.floor(diffY + canvasCenterY)
    }
}

// TODO: move this to some util module
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}