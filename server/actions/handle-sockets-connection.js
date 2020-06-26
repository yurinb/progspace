const handleEventsOf = require('../events/socket')
const clientFactory = require('../models/Client')

global.io.on('connection', function (socket) {	
	console.log('+Client connected.')
	const client = clientFactory.newClient(socket)
	global.gameObjects.clients.push(client)
	handleEventsOf(client)
	socket.use((packet, next) => {    
		if (packet.length > 1) packet[1] = global.decode(packet[1]);
		return next();     
	});
})