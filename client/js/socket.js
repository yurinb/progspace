const socket = io.connect("http://192.168.15.15:9000");
//const socket = io.connect("http://outspace.herokuapp.com");

socket.on("connect", function () {
    console.log('Client connected.');
});

socket.on("player", function (data) {
    player = data
    console.log('player ', player);
    userLoggedIn()
});

socket.on("ships", function (data) {
    ships = data
});
socket.on("bullets", function (data) {
    bullets = data
});

socket.on("stars", function (data) {
    if (data.length > 0) {
        data.forEach(element => {
            player.stars.push(element)
        });
    }
});

socket.on("score", function (data) {
    score = data
});

function emitReady() {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    console.log('emitReady, ', username, password);
    socket.emit('playerReady', {
        username,
        password
    })
}

function emitAngle() {
    setInterval(() => {
        if (getPlayerAngle()) {
            socket.emit("playerAngle", getPlayerAngle());
        }
    }, 10);
}

function emitKeyPress(key) {
    socket.emit("playerKeyPress_" + key);
}

function emitKeyRelease(key) {
    socket.emit("playerKeyRelease_" + key);
}

function emitFire() {
    socket.emit("playerFires", {}, () => {
        playShotSound()
    });
}

function emitPlayerImpulseOn() {
    socket.emit('playerImpulseOn')
}

function emitPlayerImpulseOff() {
    socket.emit('playerImpulseOff')
}