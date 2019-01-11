let objectCount = -1

module.exports = {


    newPhysicObject: function () {
        objectCount++
        let object = {
            id: objectCount,
            x: 0,
            y: 0,
            w: 10,
            h: 10,
            state: 'iddle',
            angle: 0,
            animations: []
        }
        return object
    }


}