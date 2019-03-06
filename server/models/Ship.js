const PhysicObjectFactory = require('./PhysicObject')
const WeaponFactory = require('../models/Weapon')

module.exports = {


    newShip: function (username) {
        let ship = {
            username: username,
            w: 100,
            h: 100,
            speed: 5,
            aceleration: 1,
            acelerated: 0,
            engineOn: false,
            impulseOn: false, 
            maxEnergy: 1000,
            energy: 1000,
            reactorSpeed: 1,
            weapons: [WeaponFactory.laser()],
            currentWeapon: 0,
            modelImg: 4
        }
        let physicObject = PhysicObjectFactory.newPhysicObject()

        let physicShip = Object.assign(physicObject, ship)
        
        return physicShip
    }


}