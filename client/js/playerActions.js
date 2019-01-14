function shot(evt) {
    debugger;
    if (!isEmpty(player)) {
        if (player.ship.energy >= player.ship.weapons[player.ship.currentWeapon].bullet.energyCost) {
            emitFire()
        }
    }
}

function playShotSound() {
    let audio = new Audio('/audio/cannon_A.mp3');
    audio.play();
}

onclick = shot

window.onmousedown = function (eventData) {
    if (eventData.button == 2) {
        eventData.preventDefault()
        emitPlayerImpulseOn()
        return false
    }
}

window.onmouseup = function (eventData) {
    if (eventData.button == 2) {
        eventData.preventDefault()
        emitPlayerImpulseOff()
        return false
    }
}

window.oncontextmenu = function() {
    return false
}



let up = false;
let down = false;

var map = {};
onkeydown = onkeyup = function (e) {
    map[e.keyCode] = e.type == 'keydown';

    if (map[38] /* up */ || map[87] /* w */ ) {
        if (!up) {
            emitKeyPress('w')
            up = true;
        }
    }
    if (map[40] /* down */ || map[83] /* s */ ) {
        if (!down) {
            emitKeyPress('s')
            down = true;
        }
    }

    if (map[38] == false /* up */ || map[87] == false /* w */ ) {
        if (up) {
            emitKeyRelease('w')
            up = false;
        }
    }
    if (map[40] == false /* down */ || map[83] == false /* s */ ) {
        if (down) {
            emitKeyRelease('s')
            down = false;
        }
    }
}