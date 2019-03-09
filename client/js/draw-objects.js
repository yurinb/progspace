function writeObjects() {
    setTimeout(() => {
        drawStars()
    }, 0);
    setTimeout(() => {
        drawShips()
    }, 10);
    setTimeout(() => {
        drawBullets()
    }, 20);
    setTimeout(() => {
        drawInterface()
    }, 30);
}

//const parallax = 0.25
const parallax = 1
function drawStars() {
    setInterval(() => {
        if (!isEmpty(player)) {
            backgroundC.clearRect(0, 0, screenWidth, screenHeight)
            backgroundC.save();
            backgroundC.beginPath();
            
            player.stars.slice().forEach(elem => {
                let r = 0.75 + Math.random() * 1
                elem.stars.slice().forEach(ele => {
                    let screenPosition = convertPosToPixel(ele.x, ele.y, player.ship)
                    // is star on screen?
                    if (screenPosition.x * zoom <= screenWidth && screenPosition.y * zoom <= screenHeight) {
                        //backgroundC.save();
                        //backgroundC.beginPath();
                        let z = ele.z * r
                        backgroundC.fillStyle = "rgba(" + ele.r + ", " + ele.g + ", " + ele.b + ", " + z + ")"
                        //backgroundC.translate(screenPosition.x, screenPosition.y);
                        //backgroundC.fillRect(0, 0, elem.s, elem.s)
                        backgroundC.fillRect(screenPosition.x, screenPosition.y, ele.s * zoom, ele.s * zoom)
                        //backgroundC.fillText(elem.x + ' ' + elem.y, screenPosition.x, screenPosition.y)
                        //backgroundC.restore();
                    }
                });
            })
            backgroundC.restore();
        }
    }, 30);
}

let impulseInterval = []
let shipsImpulses = []
// SHIPS
let shipsImg = []
for (let i = 1; i <= 6; i++) {
    let ship = new Image();
    ship.src = '../img/ships/ship' + i + '.png'
    shipsImg.push(ship)
}
// PROJETILS
let projetilsImg = []
for (let i = 1; i <= 1; i++) {
    let proj = new Image();
    proj.src = '../img/projetils/projetil' + i + '.png'
    projetilsImg.push(proj)
}
// PROPULSOR
let propulsor = new Image();
propulsor.src = '../img/sfx/propulsor.png'
propulsor.onload = function () {
    propulsor.width = 15
    propulsor.height = 15
}

// EXPLOSION
let explosion = new Image();
explosion.src = '../img/sfx/explosion1.png'
explosion.onload = function () {
    explosion.width = 50
    explosion.height = 50
}

function getShipImgByModelID(id) {
    if (shipsImg[id - 1]) {
        return shipsImg[id - 1]
    }
    if (id == 'propulsor') {
        return propulsor
    }
    if (id == 'dead') {
        return explosion
    }
}

function getProjetilByModel(id) {
    if (projetilsImg[id - 1]) {
        return projetilsImg[id - 1]
    }
}



function drawShips() {
    let energyShieldSizeEffect = 0
    let energyShieldSizeEffectMultipler = 1
    setInterval(() => {
        if (ships.length > 0 && !isEmpty(player)) {
            shipsC.clearRect(0, 0, screenWidth, screenHeight)
            ships.slice().forEach(elem => {
                if (elem.id == player.ship.id) {
                    player.ship = elem
                }
                
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)

                if (elem.state == 'dead') {
                    elem.decayTime += 1
                    if (elem.decayTime == 3000) {
                        elem.state = 'removible'
                        return
                    }
                    shipsC.save();
                    shipsC.beginPath();
                    shipsC.translate(screenPosition.x, screenPosition.y);
                    shipsC.drawImage(getShipImgByModelID(elem.modelImg), -(elem.w * zoom / 2), -(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                    shipsC.restore();
                    return
                }

                // energy shield
                for (let q = 0; q < 3; q++) {
                    shipsC.save();
                    shipsC.beginPath();
                    //shipsC.translate(screenPosition.x, screenPosition.y);
                    let newX = screenPosition.x - 0 * zoom * Math.cos((elem.angle + 0) * Math.PI / 180)
                    let newY = screenPosition.y - 0 * zoom * Math.sin((elem.angle + 0) * Math.PI / 180)
                    shipsC.translate(newX, newY);
                    shipsC.fillStyle = '#020202';
                    shipsC.strokeStyle = "#42f4c5";
                    energyShieldSizeEffect += 0.25 * q * energyShieldSizeEffectMultipler
                    shipsC.arc(0, 0, 50 * zoom + energyShieldSizeEffect, 0, 2 * Math.PI);
                    if (energyShieldSizeEffect >= 2) {
                        energyShieldSizeEffectMultipler = -q
                    }
                    if (energyShieldSizeEffect <= 0) {
                        energyShieldSizeEffectMultipler = q
                    }
                    shipsC.stroke();
                    shipsC.restore();
                }

                // ship
                //screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                shipsC.save();
                shipsC.beginPath();
                shipsC.translate(screenPosition.x, screenPosition.y);
                shipsC.rotate(elem.angle * Math.PI / 180);
                //shipsC.fillStyle = "white";
                //shipsC.rect(-(elem.w * zoom / 2),-(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                shipsC.drawImage(getShipImgByModelID(elem.modelImg), -(elem.w * zoom / 2), -(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                //shipsC.stroke();
                //shipsC.fill();
                shipsC.restore();

                // username
                drawUsernameAboveShip(shipsC, elem)

                // impulse/propulsor
                if (elem.impulseOn) {
                    impulseInterval--
                    if (impulseInterval <= 0) {
                        // shipsImpulses.push({
                        //     username: elem.username,
                        //     pos: {
                        //         x: elem.x,
                        //         y: elem.y
                        //     },
                        //     angle: elem.angle * Math.PI / 45
                        // })
                        //for (let i = 0; i < shipsImpulses.length; i++) {
                        //  if (shipsImpulses[i].username == elem.username) {
                        // ship
                        shipsC.save();
                        shipsC.beginPath();
                        //let screenPosition2 = convertPosToPixel(shipsImpulses[i].pos.x, shipsImpulses[i].pos.y, player.ship)
                        //let screenPosition2 = convertPosToPixel(elem.x, elem.y)
                        let newX = screenPosition.x - 70 * zoom * Math.cos((elem.angle + 0) * Math.PI / 180)
                        let newY = screenPosition.y - 70 * zoom * Math.sin((elem.angle + 0) * Math.PI / 180)
                        shipsC.translate(newX, newY);
                        //shipsC.translate(screenPosition.x, screenPosition.y);
                        //shipsC.rotate(shipsImpulses[i].angle);
                        shipsC.rotate(elem.angle * Math.PI / 180);
                        //shipsC.fillStyle = "#42f4c5";
                        //shipsC.rect(-(elem.w * zoom / 2), -(2 * zoom / 2), elem.w * zoom, 2 * zoom);
                        shipsC.drawImage(getShipImgByModelID('propulsor'), -(elem.w * zoom / 2), -(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                        //shipsC.stroke();
                        //shipsC.fill();
                        shipsC.restore();
                        //  }
                        //}
                    }
                } else {
                    if (shipsImpulses.length > 0) {
                        shipsImpulses = shipsImpulses.filter(impulse => {
                            if (elem.username == impulse.username) {
                                return false
                            }
                            return impulse
                        })
                    }
                }


            })
        } else {
            shipsC.clearRect(0, 0, screenWidth, screenHeight)
        }
    }, 30);
}

function drawBullets() {
    setInterval(() => {
        if (!isEmpty(player) && !isEmpty(bullets)) {
            bulletsC.clearRect(0, 0, screenWidth, screenHeight)
            bullets.slice().forEach(elem => {
                bulletsC.save();
                bulletsC.beginPath();
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                bulletsC.translate(screenPosition.x, screenPosition.y);
                bulletsC.rotate(elem.angle * Math.PI / 180);
                //bulletsC.fillStyle = elem.color
                //bulletsC.rect(-(elem.w * zoom / 2), -(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                //bulletsC.fill();
                bulletsC.drawImage(getProjetilByModel(elem.modelImg), -(elem.w * zoom / 2), -(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                bulletsC.restore();
            })
        } else {
            bulletsC.clearRect(0, 0, screenWidth, screenHeight)
        }
    }, 30);

}

function drawInterface() {
    setInterval(() => {
        if (!isEmpty(player)) {
            interfaceC.clearRect(0, 0, screenWidth, screenHeight)
            interfaceC.save();
            interfaceC.beginPath();

            drawShipCoords(interfaceC)

            drawEnergyBar(interfaceC)

            interfaceC.fill();
            interfaceC.restore();
        } else {
            interfaceC.clearRect(0, 0, screenWidth, screenHeight)
        }
    }, 100);

}

function drawShipCoords(c) {
    //c.font = "15px Lucida Console";
    c.textAlign = "center";
    c.fillStyle = "#42f4c5";
    c.fillText('x ' + (player.ship.x | 0) + ' y ' + (player.ship.y | 0), screenWidth / 2, 25)
}

function drawEnergyBar(c) {
    shipsC.font = "15px Lucida Console, Monaco, monospace";
    c.textAlign = "center";

    let x = screenWidth / 2
    let y = screenHeight / 2 + screenHeight / 3

    c.fillStyle = "#42f4c5";
    c.fillText('energy', x, y - 10)
    let energyBarSize = screenWidth / 4


    // background energy bar
    c.strokeStyle = "#42f4c5";
    c.strokeRect(x - energyBarSize / 2, y, energyBarSize, 10)

    // current state energy bar
    c.fillStyle = "#42f4c5";
    c.fillRect(x - energyBarSize / 2, y, energyBarSize * player.ship.energy / player.ship.maxEnergy, 10)
}

function drawUsernameAboveShip(c, ship) {
    let screenPosition = convertPosToPixel(ship.x, ship.y, player.ship)
    c.save();
    c.beginPath();
    c.font = "12px Lucida Console, Monaco, monospace";
    c.fillStyle = "#42f4c5";
    c.translate((screenPosition.x), screenPosition.y);
    c.textAlign = "center";
    c.fillText(ship.username, 0, -100 * zoom)
    c.restore();
}