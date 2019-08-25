//-----------------------------//-------------------------------
//----- Sends login data ---------------------------------------
function emitReady() {
	let username = document.querySelector('#username').value
	let password = document.querySelector('#password').value
	socket.emit('playerReady', {
		username,
		password,
		screenResolution: {w: screen.width, h: screen.height}
	})
	getUnits()
	getProjetils()
}

//-----------------------------//-------------------------------
//------------------- Get units state --------------------------
function getUnits() {
	setInterval(() => {
		socket.emit('units', {}, (data) => {
			units = data
		})
	}, 200)
}

//-----------------------------//-------------------------------
//------------------- Get projetils state --------------------------
function getProjetils() {
	setInterval(() => {
		socket.emit('projetils', {}, (data) => {
			projetils = data
		})
	}, 200)
}

//-----------------------------//-------------------------------
//----- Sends angle from unit to mouse-canvas position ---------
function emitAngle() {
	setInterval(() => {
		if (player.unit.shooting) {
			socket.emit('playerAngle', getPlayerAngle())
		}
	}, 50)
}

//-----------------------------//-------------------------------
//----- Sends keyboard action to server ------------------------
function emitKeyPress(key) {
	socket.emit('playerKeyPress_' + key)
}

//-----------------------------//-------------------------------
//----- Sends keyboard action to server ------------------------
function emitKeyRelease(key) {
	socket.emit('playerKeyRelease_' + key)
}

//-----------------------------//-------------------------------
//----- Sends fire action to server ----------------------------
function emitFire() {
	// let emitted = performance.now()
	socket.emit('playerFires', { angle: getPlayerAngle() }, () => {
		// console.log('FIRES TOOK ', performance.now() - emitted)
		// playShotSound()
	})
}

function emitStopFire() {
	socket.emit('playerStopFires')
}