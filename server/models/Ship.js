const PhysicObjectFactory = require('./PhysicObject')
const WeaponFactory = require('../models/Weapon')

module.exports = {


    newShip: function (username) {
        let ship = {
            username: username,
            size: 15,
            speed: 0,
            energy: 100,
            reactorSpeed: 5,
            weapons: [WeaponFactory.laser()],
            currentWeapon: 0
        }
        let physicShip = Object.assign(ship,
            PhysicObjectFactory.newPhysicObject()
        )
        return physicShip
    }


}