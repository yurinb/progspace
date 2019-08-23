//-----------------------------//-------------------------------
//----- Remove default action of left click --------------------
window.oncontextmenu = function () {
	return false
}

//-----------------------------//-------------------------------
//----- Activate propulsors & Player Shoot ---------------------
window.onmousedown = function (eventData) {
	if (eventData.button == 0) {
		if (!isEmpty(player)) {
			if (player.unit.energy >= player.unit.weapons[player.unit.currentWeaponIndex].bullet.energyCost) {
				emitFire()
			}
		}
		// return false
	}
}

//-----------------------------//-------------------------------
//----- Disable propulsors & Player Stops Shoot ----------------
window.onmouseup = function (eventData) {
	if (eventData.button == 0) {
		if (!isEmpty(player)) {
			emitStopFire()
		}
		// return false
	}
}

//-----------------------------//-------------------------------
//----- Player shot sound --------------------------------------
const audio = new Audio('/audio/cannon_A.mp3')
function playShotSound() {
	audio.currentTime = 0
	audio.play()
}

//-----------------------------//-------------------------------
//----- Keyboard keys state variables -----------------------------------
let up = false
let down = false
let left = false
let right = false
//-----------------------------//-------------------------------
//----- Keyboard actions ---------------------------------------
var map = {}
onkeydown = onkeyup = function (e) {
	map[e.keyCode] = e.type == 'keydown'

	// ACCELERATE
	if (map[38] /* up */ || map[87] /* w */ ) {
		if (!up) {
			emitKeyPress('w')
			up = true
		}
	}
	// ACCELERATE STOP
	if (map[38] == false /* up */ || map[87] == false /* w */ ) {
		if (up) {
			emitKeyRelease('w')
			up = false
		}
	}
	// RETURN
	if (map[40] /* down */ || map[83] /* s */ ) {
		if (!down) {
			emitKeyPress('s')
			down = true
		}
	}
	// RETURN STOP
	if (map[40] == false /* down */ || map[83] == false /* s */ ) {
		if (down) {
			emitKeyRelease('s')
			down = false
		}
	}
	// TURN LEFT
	if (map[65] /* a */ || map[37] /* < */ ) {
		if (!left) {
			emitKeyPress('a')
			left = true
		}
	}
	// TURN LEFT STOP
	if (map[65] == false /* a */ || map[37] == false /* < */ ) {
		if (left) {
			emitKeyRelease('a')
			left = false
		}
	}
	// TURN RIGHT
	if (map[68] /* d */ || map[39] /* < */ ) {
		if (!right) {
			emitKeyPress('d')
			right = true
		}
	}
	// TURN LEFT STOP
	if (map[68] == false /* d */ || map[39] == false /* < */ ) {
		if (right) {
			emitKeyRelease('d')
			right = false
		}
	}
}