const PlayerFactory = require('../models/Player')
const BulletFactory = require('../models/Bullet')
const spawnStars = require('../actions/spawnStars')


module.exports = function (client) {
    client.socket.on('disconnect', () => {
        console.log('-Client disconnected');
        if (client.player) {
            client.player.isConnected = false;
        }
    });

    client.socket.on('playerReady', userData => {
        //console.log('*Player Ready');
        let player = PlayerFactory.newPlayer(userData.username, userData.password)
        player.isConnected = true;
        client.player = player
        
        if (!global.gameObjects.ships.includes(player)) {
            global.gameObjects.ships.push(player.ship)
        }
        spawnStars.getQuadrantByPosition(player.ship.x, player.ship.y)
        client.socket.emit('stars', global.gameObjects.starsQuadrant)
        
        client.socket.emit('player', client.player)
    })

    // movement

    client.socket.on('playerKeyPress_w', () => {
        if (client.player) {
            //console.log('*Player Press W');
            client.player.ship.speed = 5
        }
    })
    client.socket.on('playerKeyRelease_w', () => {
        if (client.player) {
            //console.log('*Player Release W');
            client.player.ship.speed = 0
        }
    })

    client.socket.on('playerKeyPress_s', () => {
        if (client.player) {
            //console.log('*Player Press S');
            client.player.ship.speed = -3.5
        }
    })
    client.socket.on('playerKeyRelease_s', () => {
        if (client.player) {
            //console.log('*Player Release S');
            client.player.ship.speed = 0
        }
    })

    client.socket.on('playerAngle', angle => {
        if (client.player) {
            //console.log('*Player Sends Angle');
            client.player.ship.angle = angle
        }
    })

    // attack

    client.socket.on('playerFires', () => {
        if (client.player) {
            //console.log('*Player FIRES!');
            let bullet = BulletFactory.newBullet()
            bullet.x = client.player.ship.x + 25 * Math.cos((client.player.ship.angle) * Math.PI / 180)
            bullet.y = client.player.ship.y + 25 * Math.sin((client.player.ship.angle) * Math.PI / 180)
            bullet.angle = client.player.ship.angle

            global.gameObjects.bullets.push(bullet)
        }
    })
}