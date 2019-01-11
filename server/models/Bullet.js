const PhysicObjectFactory = require('./PhysicObject')

module.exports = {


    newBullet: function () {
        let bullet = {
            damage: 10,
            speed: 15,
            lifeTime: 3000,
            color: 'white',
            w: 2,
            h: 20,
        }
        let physicBullet = Object.assign(bullet,
            PhysicObjectFactory.newPhysicObject()
        )
        return physicBullet
    }


}