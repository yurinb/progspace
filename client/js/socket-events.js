//-----------------------------//-------------------------------
//----- Client receives connect confirmation -------------------
socket.on('connect', function () {
	console.log('Client connected.')
})

//-----------------------------//-------------------------------
//----- Client receives player data after login ----------------
socket.on('player', function (data) {
	player = data
	userLoggedIn()
})

//-----------------------------//----------------------------------
//----- Client receives new units data(position, angle, etc) ------
socket.on('units_position', function (data) {
	units = units.map(unit => {
		const found = data.find(el => el.id == unit.id)
		if (found) unit = {...unit, ...found}
		return unit
	})
})

//-----------------------------//----------------------------------
//----- Client receives new projetils data(position, state, etc) --
socket.on('projetils', function (data) {
	projetils = data
})

//-----------------------------//----------------------------------
//----- Client receives new stars quadrant (10000 x 10000) ----------
const cache = 10
socket.on('stars', function (data) {
	if (data.length > 0) {
		data.forEach(element => {
			if (player.stars.length >= cache) {
				player.stars.pop()
			}
			player.stars.unshift(element)
		})
	}
})

//-----------------------------//----------------------------------
//----- Client receives current score rank (kills) ----------------
socket.on('score', function (data) {
	score = data
})
