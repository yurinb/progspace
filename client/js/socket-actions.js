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
	socket.emit('ships', {}, (data) => {
		ships = data
	})
}

//-----------------------------//-------------------------------
//----- Sends angle from ship to mouse-canvas position ---------
function emitAngle() {
	setInterval(() => {
		if (getPlayerAngle()) {
			socket.emit('playerAngle', getPlayerAngle())
		}
	}, 30)
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
	let emitted = performance.now()
	socket.emit('playerFires', {}, () => {
		console.log('FIRES TOOK ', performance.now() - emitted)
		playShotSound()
	})
}

//-----------------------------//-------------------------------
//----- Sends propulsor action to server -------------------------
function emitPlayerPropulsorOn() {
	socket.emit('playerPropulsorOn')
}

//-----------------------------//-------------------------------
//----- Sends propulsor action to server -------------------------
function emitPlayerPropulsorOff() {
	socket.emit('playerPropulsorOff')
}