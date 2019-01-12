const PhysicObjectFactory = require('./PhysicObject')

module.exports = {


    newLaser: function (username) {
        let physicBullet = PhysicObjectFactory.newPhysicObject()

        let bullet = {
            damage: 0,
            speed: 15,
            lifeTime: 1000,
            color: '#FF5500',
            w: 5,
            h: 5,
            username,
            explosion: {
                particles : 30, 
                maxDamage : 10, 
                minSize : 1, 
                maxSize : 3, 
                minSpeed: 25, 
                maxSpeed: 35,
                maxLifeTime: 100,
                color: '#FF5500',
                username
            }
        }

        return Object.assign(physicBullet,
            bullet
        )
    },

    newExplosionParticle: function (x, y, explosion) {
        let physicObject = PhysicObjectFactory.newPhysicObject()

        let bullet = {
            x,
            y,
            damage: explosion.maxDamage * (explosion.size / explosion.maxSize),
            speed: explosion.minSpeed + Math.random() * (explosion.maxSpeed - explosion.minSpeed),
            lifeTime: Math.random() * explosion.maxLifeTime,
            color: explosion.color,
            w: explosion.minSize + Math.random() * (explosion.maxSize - explosion.minSize),
            h: explosion.minSize + Math.random() * (explosion.maxSize - explosion.minSize),
            username: explosion.username,
            angle: Math.random() * 360,
            explosion: false
        }
        let physicBullet = Object.assign(physicObject, bullet)

        return Object.assign(physicBullet,
            bullet
        )
    },

    newEngineParticle: function(x, y, username) {
        let physicObject = PhysicObjectFactory.newPhysicObject()

        let bullet = {
            x,
            y,
            lifeTime: 0,
            color: 'blue',
            w: 1,
            h: 1,
            username,
            explosion: {
                particles : 30, 
                maxDamage : 0, 
                minSize : 1, 
                maxSize : 2, 
                minSpeed: 2, 
                maxSpeed: 10,
                maxLifeTime: 1,
                color: 'blue',
                username
            }
        }
        let physicBullet = Object.assign(physicObject, bullet)

        return physicBullet
    }


}