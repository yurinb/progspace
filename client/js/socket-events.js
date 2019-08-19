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
//----- Client receives new ships data(position, angle, etc) ------
socket.on('ships_position', function (data) {
	ships = ships.map(ship => {
		const found = data.find(el => el.username == ship.username)
		if (found) ship = {...ship, ...found}
		return ship
	})
})

//-----------------------------//----------------------------------
//----- Client receives new projetils data(position, state, etc) --
socket.on('bullets', function (data) {
	bullets = data
})

//-----------------------------//----------------------------------
//----- Client receives new stars quadrant (10000 x 10000) ----------
const cache = 10
socket.on('stars', function (data) {
	if (data.length > 0) {
		data.slice().forEach(element => {
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
