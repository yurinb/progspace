const PlayerFactory = require('../models/Player')
const BulletFactory = require('../models/Bullet')

module.exports = function (client) {
    client.socket.on('disconnect', () => {
        console.log('-Client disconnected');
    });

    client.socket.on('playerReady', userData => {
        console.log('*Player Ready', userData);
        let player = PlayerFactory.newPlayer(userData.username, userData.password)
        console.log('READY PLAYER : ', player);
        
        client.player = player
        if (!global.gameObjects.ships.includes(player)) {
            global.gameObjects.ships.push(player.ship)    
        }
        
        client.socket.emit('player', client.player)
    })

    // movement

    client.socket.on('playerKeyPress_w', () => {
        if (client.player) {
            
            console.log('*Player Press W');
            client.player.ship.speed = 5
        }
    })
    client.socket.on('playerKeyRelease_w', () => {
        if (client.player) {
            
            console.log('*Player Press W');
            client.player.ship.speed = 0
        }
    })
    
    client.socket.on('playerKeyPress_s', () => {
        if (client.player) {
            
            console.log('*Player Press S');
            client.player.ship.speed = -3.5
        }
    })
    client.socket.on('playerKeyRelease_s', () => {
        if (client.player) {
            
            console.log('*Player Press S');
            client.player.ship.speed = 0
        }
    })
    
    client.socket.on('playerAngle', data => {
        if (client.player) {
            //console.log('*Player Sends Angle');
            client.player.ship.angle = data.angle
        }
    })
    
    // attack
    
    client.socket.on('playerFires', () => {
        if (client.player) {
            console.log('*Player FIRES!');
            let bullet = BulletFactory.newBullet()
            bullet.x = client.player.ship.x + 25 * Math.cos((client.player.ship.angle) * Math.PI / 180)
            bullet.y = client.player.ship.y + 25 * Math.sin((client.player.ship.angle) * Math.PI / 180)
            bullet.angle = client.player.ship.angle

            global.gameObjects.bullets.push(bullet)
        }
    })
}