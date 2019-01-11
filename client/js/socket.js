const socket = io.connect("http://localhost:9000");

socket.on("connect", function () {
    console.log('Client connected.');
});

socket.on("player", function (data) {
    player = data
    console.log('PLAYERRRRR ', data);

});

socket.on("ships", function (data) {
    ships = data
    console.log('SHIPS ', data);

});
socket.on("bullets", function (data) {
    bullets = data
});

socket.on("stars", function (data) {
    if (stars.length == 0) {
        stars = data
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
    userLoggedIn()
}

function emitAngle() {
    if (player.ship.angle) {
        setTimeout(() => {
            socket.emit("playerAngle", {
                angle: player.ship.angle
            });
        }, 0);
    }
}

function emitKeyPress(key) {
    setTimeout(() => {
        socket.emit("playerKeyPress_" + key);
    }, 0);
}

function emitKeyRelease(key) {
    setTimeout(() => {
        socket.emit("playerKeyRelease_" + key);
    }, timeout);
}

function emitFire() {
    setTimeout(() => {
        socket.emit("playerFires");
    }, 0);
}