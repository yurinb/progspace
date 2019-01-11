function shot() {
    playShotSound()
    emitFire()
}

function playShotSound() {
    let audio = new Audio('/audio/cannon_A.mp3');
    audio.play();
}

onclick = shot

let up = false;
let down = false;

var map = {};
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    if (map[38] /* up */ || map[87] /* w */) {
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

    if (map[38] == false /* up */ || map[87]  == false /* w */) {
        emitKeyRelease('w')
        up = false;
    }
    if (map[40] == false /* down */ || map[83] == false /* s */ ) {
        emitKeyRelease('s')
        down = false;
    }
}

function press(e) {
    if (e.keyCode == 38 /* up */ || e.keyCode == 87 /* w */ || e.keyCode == 90 /* z */ ) {
        if (!up) {
            emitKeyPress('w')
            up = true;
        }
    }
    if (e.keyCode == 40 /* down */ || e.keyCode == 83 /* s */ ) {
        if (!down) {
            emitKeyPress('s')
            down = true;
        }
    }
}

function release(e) {
    if (e.keyCode == 38 /* up */ || e.keyCode == 87 /* w */ || e.keyCode == 90 /* z */ ) {
        emitKeyRelease('w')
        up = false;
    }
    if (e.keyCode == 40 /* down */ || e.keyCode == 83 /* s */ ) {
        emitKeyRelease('s')
        down = false;
    }
}

//document.addEventListener('keydown', press)

//document.addEventListener('keyup', release)