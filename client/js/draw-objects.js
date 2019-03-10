const images = []

// SHIPS
for (let i = 1; i <= 6; i++) {
    let ship = new Image();
    ship.src = '../img/ships/ship' + i + '.png'
    images.push(ship)
}
// PROJETILS
for (let i = 1; i <= 1; i++) {
    let projetil = new Image();
    projetil.src = '../img/projetils/projetil' + i + '.png'
    projetil.onload = function () {
        projetil.width = 150
        projetil.height = 100
    }
    images.push(projetil)
}
// PROPULSOR
for (let i = 1; i <= 2; i++) {
    let propulsor = new Image();
    propulsor.src = '../img/sfx/propulsor' + i + '.png'
    propulsor.onload = function () {
        propulsor.width = 200
        propulsor.height = 200
    }
    images.push(propulsor)
}
// EXPLOSION
for (let i = 1; i <= 13; i++) {
    let explosion = new Image();
    explosion.src = '../img/sfx/explosion' + i + '.png'
    explosion.onload = function () {
        explosion.width = 500
        explosion.height = 500
    }
    images.push(explosion)
}

// GET IMAGE
function getImgBySrc(src) {
    for (let index = 0; index < images.length; index++) {
        let element = images[index];
        try {
            if (element.src.endsWith(src.substring(3))) {
                return element
            }
        } catch (error) {
            return ''
        }
    }
}

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
                let shipFrame = getImgBySrc(elem.animation.frame)
                let propulsorFrame = getImgBySrc(elem.propulsor.animation.frame)

                if (elem.state == 'dead') {
                    elem.decayTime += 1
                    if (elem.decayTime == 3000) {
                        elem.state = 'removible'
                        return
                    }
                    shipsC.save();
                    shipsC.beginPath();
                    shipsC.translate(screenPosition.x, screenPosition.y);
                    shipsC.drawImage(shipFrame, -(shipFrame.width * zoom / 2), -(shipFrame.height * zoom / 2), shipFrame.width * zoom, shipFrame.height * zoom);
                    shipsC.restore();
                    return
                }

                // ship
                //screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                shipsC.save();
                shipsC.beginPath();
                shipsC.translate(screenPosition.x, screenPosition.y);
                shipsC.rotate(elem.angle * Math.PI / 180);
                //shipsC.fillStyle = "white";
                //shipsC.rect(-(elem.w * zoom / 2),-(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                try {
                    shipsC.drawImage(shipFrame, -(shipFrame.width * zoom / 2), -(shipFrame.height * zoom / 2), shipFrame.width * zoom, shipFrame.height * zoom);
                } catch (error) {}
                //shipsC.stroke();
                //shipsC.fill();
                shipsC.restore();

                // energy shield
                for (let q = 0; q < 3; q++) {
                    shipsC.save();
                    //shipsC.translate(screenPosition.x, screenPosition.y);
                    let newX = screenPosition.x - 0 * zoom * Math.cos((elem.angle + 0) * Math.PI / 180)
                    let newY = screenPosition.y - 0 * zoom * Math.sin((elem.angle + 0) * Math.PI / 180)
                    shipsC.translate(newX, newY);
                    shipsC.fillStyle = '#020202';
                    shipsC.strokeStyle = "#42f4c5";
                    energyShieldSizeEffect += 0.25 * q * energyShieldSizeEffectMultipler

                    shipsC.beginPath();
                    shipsC.arc(0, 0, (shipFrame.width + shipFrame.height) / 4 * zoom + energyShieldSizeEffect * q, 0, 2 * Math.PI);
                    shipsC.stroke();
                    shipsC.beginPath();
                    shipsC.arc(0, 0, (shipFrame.width + shipFrame.height) / 3.5 * zoom - energyShieldSizeEffect * q, 0, 2 * Math.PI);
                    shipsC.stroke();
                    shipsC.restore();

                    if (energyShieldSizeEffect >= 2) {
                        energyShieldSizeEffectMultipler = -q
                    }
                    if (energyShieldSizeEffect <= 0) {
                        energyShieldSizeEffectMultipler = q
                    }
                }

                // username
                drawUsernameAboveShip(shipsC, elem)

                // propulsor
                if (elem.propulsor.on) {
                    shipsC.save();
                    shipsC.beginPath();
                    //let screenPosition2 = convertPosToPixel(shipsImpulses[i].pos.x, shipsImpulses[i].pos.y, player.ship)
                    //let screenPosition2 = convertPosToPixel(elem.x, elem.y)
                    let newX = screenPosition.x - 160 * zoom * Math.cos((elem.angle + 0) * Math.PI / 180)
                    let newY = screenPosition.y - 160 * zoom * Math.sin((elem.angle + 0) * Math.PI / 180)
                    shipsC.translate(newX, newY);
                    shipsC.rotate(elem.angle * Math.PI / 180);
                    try {
                        shipsC.drawImage(propulsorFrame, -(propulsorFrame.width * zoom / 2), -(propulsorFrame.height * zoom / 2), propulsorFrame.width * zoom, propulsorFrame.height * zoom);
                    } catch (error) {}
                    shipsC.restore();
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
                let projetilImg = getImgBySrc(elem.animation.frame)
                bulletsC.save();
                bulletsC.beginPath();
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                bulletsC.translate(screenPosition.x, screenPosition.y);
                bulletsC.rotate(elem.angle * Math.PI / 180);
                try {
                    bulletsC.drawImage(projetilImg, -(projetilImg.width * zoom / 2), -(projetilImg.height * zoom / 2), projetilImg.width * zoom, projetilImg.height * zoom);
                } catch (error) {}
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
    c.fillText(ship.username, 0, -200 * zoom)
    c.restore();
}