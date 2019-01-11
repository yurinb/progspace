const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

io.on('error', err => {
    console.log('Socket ERROR: ', err);
})

global.io = io
global.gameEvents = new MyEmitter()

app.use(express.static('client'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '../client/index.html');
});


require('./actions/setGameObjects')
require('./actions/handleSocketsConnection')
require('./actions/moveObjects')


const PORT = 9000

http.listen(PORT, function () {
    console.log('Server listen on *:' + PORT);
});