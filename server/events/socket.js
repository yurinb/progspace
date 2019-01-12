const PlayerFactory = require('../models/Player')
const BulletFactory = require('../models/Bullet')
const spawnStars = require('../actions/spawnStars')


module.exports = function (client) {
    client.socket.on('disconnect', () => {
        console.log('-Client disconnected');
    });

    client.socket.on('playerReady', userData => {
        //console.log('*Player Ready');
        let clients = global.gameObjects.clients
        let playerFound = false
        for (let index = 0; index < clients.length; index++) {
            if (clients[index].player) {
                if (clients[index].player.username == userData.username && clients[index].player.password == userData.password) {
                    playerFound = true
                    client.player = clients[index].player
                    client.socket.emit('player', client.player)
                    break
                }
            }
        }

        if (!playerFound) {
            let player = PlayerFactory.newPlayer(userData.username, userData.password)
            client.player = player
            global.gameObjects.ships.push(player.ship)
            client.socket.emit('player', client.player)
        }

    })

    // movement

    client.socket.on('playerKeyPress_w', () => {
        if (client.player) {
            //console.log('*Player Press W');
            client.player.ship.engineOn = true
        }
    })
    client.socket.on('playerKeyRelease_w', () => {
        if (client.player) {
            //console.log('*Player Release W');
            client.player.ship.engineOn = false
        }
    })

    client.socket.on('playerKeyPress_s', () => {
        if (client.player) {
            //console.log('*Player Press S');
            //client.player.ship.speed = -2
        }
    })
    client.socket.on('playerKeyRelease_s', () => {
        if (client.player) {
            //console.log('*Player Release S');
            //client.player.ship.speed = 0
        }
    })

    client.socket.on('playerAngle', angle => {
        if (client.player) {
            client.player.ship.angle = angle
        }
    })

    // attack

    client.socket.on('playerFires', () => {
        if (client.player) {
            //console.log('*Player FIRES!');
            let bullet = BulletFactory.newLaser(client.player.username)
            bullet.x = client.player.ship.x + 20 * Math.cos((client.player.ship.angle) * Math.PI / 180)
            bullet.y = client.player.ship.y + 20 * Math.sin((client.player.ship.angle) * Math.PI / 180)
            bullet.angle = client.player.ship.angle

            global.gameObjects.bullets.push(bullet)
        }
    })
}