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
    debugger;
    setInterval(() => {
        if (!isEmpty(player)) {
            backgroundC.clearRect(0, 0, screenWidth, screenHeight)
            backgroundC.save();
            backgroundC.beginPath();
            backgroundC.restore();

            player.stars.forEach(elem => {
                let r = 0.75 + Math.random() * 1
                elem.stars.forEach(ele => {
                    let screenPosition = convertPosToPixel(ele.x, ele.y, player.ship)
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
        }
    }, 30);
}

let impulseInterval = []
let shipsImpulses = []

function drawShips() {
    let energyShieldSizeEffect = 0
    let energyShieldSizeEffectMultipler = 1
    setInterval(() => {
        if (ships.length > 0 && !isEmpty(player)) {
            shipsC.clearRect(0, 0, screenWidth, screenHeight)
            ships.forEach(elem => {
                if (elem.id == player.ship.id) {
                    player.ship = elem
                }
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                // energy shield
                for (let q = 0; q < 3; q++) {
                    shipsC.save();
                    shipsC.beginPath();
                    shipsC.translate(screenPosition.x, screenPosition.y);
                    shipsC.fillStyle = '#020202';
                    shipsC.strokeStyle = "#42f4c5";
                    energyShieldSizeEffect += 0.25 * q * energyShieldSizeEffectMultipler
                    shipsC.arc(0, 0, 10 * zoom + energyShieldSizeEffect, 0, 2 * Math.PI);
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
                shipsC.save();
                shipsC.beginPath();
                shipsC.translate(screenPosition.x, screenPosition.y);
                shipsC.rotate(elem.angle * Math.PI / 180);
                shipsC.fillStyle = "white";
                shipsC.rect(-(elem.w * zoom / 2), -(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                //backgroundC.drawImage(ele.img, -15, -15, 30, 30);
                shipsC.stroke();
                shipsC.fill();
                shipsC.restore();

                // impulse
                if (elem.impulseOn) {
                    impulseInterval--
                    if (impulseInterval <= 0) {
                        shipsImpulses.push({
                            username: elem.username,
                            pos: {
                                x: elem.x,
                                y: elem.y
                            }
                        })
                        for (let i = 0; i < shipsImpulses.length; i++) {
                            if (shipsImpulses[i].username == elem.username) {
                                // ship
                                shipsC.save();
                                shipsC.beginPath();
                                let screenPosition2 = convertPosToPixel(shipsImpulses[i].pos.x, shipsImpulses[i].pos.y, player.ship)
                                shipsC.translate(screenPosition2.x, screenPosition2.y);
                                shipsC.rotate(elem.angle * Math.PI / 180);
                                shipsC.fillStyle = "#42f4c5";
                                shipsC.rect(-(elem.w * zoom / 2), -(2 * zoom / 2), elem.w * zoom, 2 * zoom);
                                //backgroundC.drawImage(ele.img, -15, -15, 30, 30);
                                shipsC.stroke();
                                shipsC.fill();
                                shipsC.restore();
                            }
                        }
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

                // username
                shipsC.save();
                shipsC.beginPath();
                shipsC.font = "15px sans-serif";
                shipsC.fillStyle = "#42f4c5";
                shipsC.translate(25, 25);
                shipsC.textAlign = "center";
                shipsC.fillText(elem.username, 0, 0)
                shipsC.restore();
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
            bullets.forEach(elem => {
                bulletsC.save();
                bulletsC.beginPath();
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                bulletsC.translate(screenPosition.x, screenPosition.y);
                bulletsC.rotate(elem.angle * Math.PI / 180);
                bulletsC.fillStyle = elem.color
                bulletsC.rect(-(elem.w * zoom / 2), -(elem.h * zoom / 2), elem.w * zoom, elem.h * zoom);
                bulletsC.fill();
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
    c.fillText('x ' + (player.ship.x | 0) + ' y ' + (player.ship.x | 0), screenWidth / 2, 25)
}

function drawEnergyBar(c) {
    shipsC.font = "15px sans-serif";
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