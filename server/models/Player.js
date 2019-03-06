const ShipFactory = require('./Ship')

let playerCount = -1

function getPlayerBy(username, password) {
    let playerFound = false
    global.gameObjects.clients.slice().forEach(element => {
        if (!playerFound) {
            let player = element.player
            if (player) {
                if (player.username == username && player.password == password) {
                    playerFound = player
                }
            }
        }
    });

    return playerFound
}

module.exports = {


    newPlayer: function (username, password) {
        playerCount++
        let playerFound = getPlayerBy(username, password)
        if (playerFound) {
            return playerFound
        } else {
            let player = {
                id: playerCount,
                username,
                password,
                stars: [],
                ship: ShipFactory.newShip(username)
            }
            return player
        }
    }


}