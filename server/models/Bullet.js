const PhysicObjectFactory = require('./PhysicObject')
const AnimationsFactory = require('./Animation')
const Animate = require('../actions/animate')



module.exports = {
    
    
    newLaser: function (username) {
        let physicBullet = PhysicObjectFactory.newPhysicObject()
        let idleProjetilAnimation = AnimationsFactory.newAnimation('idle', ['../img/projetils/projetil1.png'], 100, true)
        let deadProjetilAnimation = AnimationsFactory.newAnimation('dead',
            ['/img/sfx/explosion1.png', '/img/sfx/explosion2.png', '/img/sfx/explosion3.png', '/img/sfx/explosion4.png', '/img/sfx/explosion5.png', '/img/sfx/explosion6.png',
                '/img/sfx/explosion7.png', '/img/sfx/explosion8.png', '/img/sfx/explosion9.png', '/img/sfx/explosion10.png', '/img/sfx/explosion11.png', '/img/sfx/explosion12.png', '/img/sfx/explosion13.png'
            ], 50, false)

        let bullet = {
            damage: 25,
            speed: 250,
            lifeTime: 3000,
            color: '#ffffff',
            modelImg: 1,
            w: 80,
            h: 42,
            energyCost: 5,
            username,
            shipAcelerated: 0,
            state: 'idle',
            animation: idleProjetilAnimation,
            animations: [idleProjetilAnimation, deadProjetilAnimation]
        }

        let projetil = Object.assign(physicBullet, bullet)

        Animate.animate(projetil)

        return projetil
    },



}