//-----------------------------//-------------------------------
//----- Remove default action of left click --------------------
window.oncontextmenu = function () {
    return false
}

//-----------------------------//-------------------------------
//----- Activate propulsors ------------------------------------
window.onmousedown = function (eventData) {
    if (eventData.button == 2) {
        eventData.preventDefault()
        emitPlayerImpulseOn()
        return false
    }
}

//-----------------------------//-------------------------------
//----- Disable propulsors -------------------------------------
window.onmouseup = function (eventData) {
    if (eventData.button == 2) {
        eventData.preventDefault()
        emitPlayerImpulseOff()
        return false
    }
}

//-----------------------------//-------------------------------
//----- Player shot ----------------------------------
function shot(evt) {
    if (!isEmpty(player)) {
        if (player.ship.energy >= player.ship.weapons[player.ship.currentWeapon].bullet.energyCost) {
            emitFire()
        }
    }
}

//-----------------------------//-------------------------------
//----- Call Player shot when right click ----------------------
onclick = shot

//-----------------------------//-------------------------------
//----- Player shot sound --------------------------------------
function playShotSound() {
    let audio = new Audio('/audio/cannon_A.mp3');
    audio.play();
}

//-----------------------------//-------------------------------
//----- Keyboard keys state variables -----------------------------------
let up = false;
let down = false;
//-----------------------------//-------------------------------
//----- Keyboard actions ---------------------------------------
var map = {};
onkeydown = onkeyup = function (e) {
    map[e.keyCode] = e.type == 'keydown';

    // ACCELERATE
    if (map[38] /* up */ || map[87] /* w */ ) {
        if (!up) {
            emitKeyPress('w')
            up = true;
        }
    }
    // ACCELERATE STOP
    if (map[38] == false /* up */ || map[87] == false /* w */ ) {
        if (up) {
            emitKeyRelease('w')
            up = false;
            emitPlayerImpulseOff()
        }
    }
    // RETURN
    if (map[40] /* down */ || map[83] /* s */ ) {
        if (!down) {
            emitKeyPress('s')
            down = true;
        }
    }
    // RETURN STOP
    if (map[40] == false /* down */ || map[83] == false /* s */ ) {
        if (down) {
            emitKeyRelease('s')
            down = false;
        }
    }
    // TURN LEFT
    if (map[65] /* a */ || map[37] /* < */ ) {
        if (!down) {
            emitKeyPress('a')
            down = true;
        }
    }
    // TURN LEFT STOP
    if (map[65] == false /* a */ || map[37] == false /* < */ ) {
        if (down) {
            emitKeyRelease('a')
            down = false;
        }
    }
    // TURN RIGHT
    if (map[68] /* a */ || map[39] /* < */ ) {
        if (!down) {
            emitKeyPress('d')
            down = true;
        }
    }
    // TURN LEFT STOP
    if (map[68] == false /* a */ || map[39] == false /* < */ ) {
        if (down) {
            emitKeyRelease('d')
            down = false;
        }
    }
}