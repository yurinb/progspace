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

    client.socket.on('playerFires', (data, callback) => {
        if (client.player) {
            //console.log('*Player FIRES!');
            let energyCost = client.player.ship.weapons[client.player.ship.currentWeapon].bullet.energyCost
            if (client.player.ship.energy >= energyCost) {
                let bullet = BulletFactory.newLaser(client.player.username)
                bullet.x = client.player.ship.x + 20 * Math.cos((client.player.ship.angle + 15) * Math.PI / 180)
                bullet.y = client.player.ship.y + 20 * Math.sin((client.player.ship.angle + 15) * Math.PI / 180)
                bullet.angle = client.player.ship.angle
                bullet.shipAcelerated = client.player.ship.acelerated
                client.player.ship.energy -= energyCost
                global.gameObjects.bullets.push(bullet)

                let bullet2 = BulletFactory.newLaser(client.player.username)
                bullet2.x = client.player.ship.x + 20 * Math.cos((client.player.ship.angle - 15) * Math.PI / 180)
                bullet2.y = client.player.ship.y + 20 * Math.sin((client.player.ship.angle - 15) * Math.PI / 180)
                bullet2.angle = client.player.ship.angle
                bullet2.shipAcelerated = client.player.ship.acelerated
                client.player.ship.energy -= energyCost
                global.gameObjects.bullets.push(bullet2)
                callback()
            }
        }
    })

    client.socket.on('playerImpulseOn', () => {
        if (client.player) {
            let energyCost = client.player.ship.maxEnergy * 0.01 * 0.25
            if (client.player.ship.energy >= energyCost) {
                client.player.ship.impulseOn = true
            }
        }
    })
    
    client.socket.on('playerImpulseOff', () => {
        if (client.player) {
            client.player.ship.impulseOn = false
        }
    })
}