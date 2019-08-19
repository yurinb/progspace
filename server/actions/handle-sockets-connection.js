const handleEventsOf = require('../events/socket')
const clientFactory = require('../models/Client')

global.io.on('connection', function (socket) {
	console.log('+Client connected.')
	const client = clientFactory.newClient(socket)
	global.gameObjects.clients.push(client)
	handleEventsOf(client)
})