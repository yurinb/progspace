let count = -1
module.exports = {

    newClient: function (socket) {
        count++
        let client = {
            id: count,
            socket: socket,
            player: null
        }
        return client
    }

}