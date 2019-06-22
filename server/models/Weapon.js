const BulletFactory = require('../models/Bullet')

function newWeapon(username) {
    let weapon = {
        name: '',
        bullet: BulletFactory.newLaser(username),
        energyCost: 10,
        canalizeTime: 1000,
        cooldawn: 500
    }
    return weapon
}

function laser() {
    let weapon = newWeapon()
    weapon.name = 'laser'
    weapon.cooldawn -= weapon.cooldawn / 2
    return weapon
}

module.exports = {
    laser
}