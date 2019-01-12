const PhysicObjectFactory = require('./PhysicObject')
const WeaponFactory = require('../models/Weapon')

module.exports = {


    newShip: function (username) {
        let ship = {
            username: username,
            w: 15,
            h: 10,
            speed: 10,
            aceleration: 1,
            acelerated: 0,
            engineOn: false,
            maxEnergy: 100,
            energy: 100,
            reactorSpeed: 1,
            weapons: [WeaponFactory.laser()],
            currentWeapon: 0
        }
        let physicObject = PhysicObjectFactory.newPhysicObject()

        let physicShip = Object.assign(physicObject, ship)
        
        return physicShip
    }


}