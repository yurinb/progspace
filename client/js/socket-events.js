//-----------------------------//-------------------------------
//----- Client receives connect confirmation -------------------
socket.on('connect', function () {
	console.log('Client connected.')
})

//-----------------------------//-------------------------------
//----- Client receives player data after login ----------------
socket.on('player', function (data) {
	data = decode(data);
	player = data
	userLoggedIn()
	startScore(units)
})

//-----------------------------//----------------------------------
//----- Client receives new objects data(position, state, etc) --
socket.on('init', function (data) {
	data = decode(data);
	for (id in data.projetils) {
		projetils[id] = data.projetils[id]
	}
	for (id in data.units) {
		units[id] = data.units[id]
	}
})

//-----------------------------//----------------------------------
//----- Client receives updates data(position, state, etc) --
socket.on('update', function (data) {
	data = decode(data);
	for (id in data.projetils) {
		if (projetils[id]) {
			Object.keys(data.projetils[id]).forEach(attribute => {
				projetils[id][attribute] = data.projetils[id][attribute]
			})
			// projetils[id] = {...projetils[id], ...data.projetils[id]}
		}
	}
	for (id in data.units) {
		if (units[id]) {
			Object.keys(data.units[id]).forEach(attribute => {
				units[id][attribute] = data.units[id][attribute]
			})
			// units[id] = {...units[id], ...data.units[id]}
		}
	}
})

//-----------------------------//----------------------------------
//----- Client receives objects that where removed ----------------
socket.on('remove', function (data) {
	data = decode(data);
	data.projetils.forEach(id => {
		delete projetils[id]
	})
	data.units.forEach(id => {
		delete units[id]
	})
})

//-----------------------------//----------------------------------
//----- Client receives new stars quadrant (10000 x 10000) ----------
const cache = 30
socket.on('stars', function (data) {
	data = decode(data);
	if (data.length > 0) {
		data.forEach(element => {
			if (player.stars.length >= cache) {
				player.stars.pop()
			}
			player.stars.unshift(element)
		})
	}
})