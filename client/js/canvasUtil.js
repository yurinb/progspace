function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

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

// se o main ta no x0 y0
// e tem um objeto no     -x5000, -y3000
// objeto do centro       -x5500, -y3500
// a distancia do objeto ao centro é de x500 y-500
// tamanho da tela = 1300 x 700
// considerando o centro da tela vai dar max x-650 e y-350,  x650 e y350
// fora dessa area nao aparece na tela
// ou seja 
// if objeto.x '500' for maior que a maxima-menor && se '500' for menor que a maxima-maior
// if objeto.y '500' for maior que a maxima-menor && se '500' for menor que a maxima-maior
let zoom = 1
window.addEventListener('mousewheel', function (e) {
    if (e.wheelDelta < 0 && zoom > 0.15) {
        zoom-= 0.05;
    } else if (e.wheelDelta > 0 && zoom < 2) {
        zoom+= 0.05;
    }
});

function convertPosToPixel(x, y, playerShip) { // 

    let canvasCenterX = canvas.width / 2
    let canvasCenterY = canvas.height / 2

    let diffX = (x - playerShip.x) * zoom
    let diffY = (y - playerShip.y) * zoom

    return {
        x: diffX + canvasCenterX,
        y: diffY + canvasCenterY
        // x: Math.floor(diffX + canvasCenterX),
        // y: Math.floor(diffY + canvasCenterY)
    }
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}