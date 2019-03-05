const PhysicObjectFactory = require('./PhysicObject')

module.exports = {


    newLaser: function (username) {
        let physicBullet = PhysicObjectFactory.newPhysicObject()

        let bullet = {
            damage: 25,
            speed: 35,
            lifeTime: 3000,
            color: '#ffffff',
            modelImg: 1,
            w: 80,
            h: 42,
            energyCost: 5,
            username,
            shipAcelerated: 0, 
        }

        return Object.assign(physicBullet,
            bullet
        )
    },



}