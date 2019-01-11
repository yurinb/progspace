const PhysicObjectFactory = require('./PhysicObject')

module.exports = {


    newBullet: function () {
        let physicBullet = PhysicObjectFactory.newPhysicObject()

        let bullet = {
            damage: 10,
            speed: 30,
            lifeTime: 3000,
            color: 'white',
            w: 20,
            h: 2
        }

        return Object.assign(physicBullet,
            bullet
        )
    }


}