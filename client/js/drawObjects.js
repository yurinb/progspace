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
            backgroundC.save();
            backgroundC.beginPath();
            backgroundC.clearRect(0, 0, screenWidth, screenHeight)
            backgroundC.restore();

            let count = 0
            player.stars.forEach(elem => {
                elem.stars.forEach(ele => {
                    let screenPosition = convertPosToPixel(ele.x, ele.y, player.ship)
                    if (screenPosition.x * zoom <= screenWidth && screenPosition.y * zoom <= screenHeight) {
                        count++
                        //backgroundC.save();
                        //backgroundC.beginPath();
                        backgroundC.fillStyle = "rgba(" + ele.r + ", " + ele.g + ", " + ele.b + ", " + ele.z * Math.random() + ")"
                        //backgroundC.translate(screenPosition.x, screenPosition.y);
                        //backgroundC.fillRect(0, 0, elem.s, elem.s)
                        backgroundC.fillRect(screenPosition.x, screenPosition.y, ele.s * zoom, ele.s * zoom)
                        //backgroundC.fillText(elem.x + ' ' + elem.y, screenPosition.x, screenPosition.y)
                        //backgroundC.restore();
                    }
                });
            })
            console.log('drawing stars: ', count);
        }
    }, 30);
}

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


                // username
                shipsC.save();
                shipsC.beginPath();
                shipsC.font = "15px Lucida Console";
                shipsC.fillStyle = "#42f4c5";
                shipsC.translate(screenPosition.x, screenPosition.y + 10 + 35 * zoom);
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

            interfaceC.font = "15px Lucida Console";
            interfaceC.textAlign = "center";

            let x = screenWidth / 2
            let y = screenHeight / 2 + screenHeight / 3

            interfaceC.fillStyle = "#42f4c5";
            interfaceC.fillText('energy', x, y - 10)
            let energyBarSize = screenWidth / 4

            // background energy bar
            interfaceC.strokeStyle = "#42f4c5";
            interfaceC.strokeRect(x - energyBarSize / 2, y, energyBarSize, 10)

            // current state energy bar
            interfaceC.fillStyle = "#42f4c5";
            interfaceC.fillRect(x - energyBarSize / 2, y, energyBarSize * player.ship.energy / player.ship.maxEnergy, 10)

            interfaceC.fill();
            interfaceC.restore();
        } else {
            interfaceC.clearRect(0, 0, screenWidth, screenHeight)
        }
    }, 100);

}