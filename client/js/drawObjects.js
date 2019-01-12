function writeObjects() {
    setTimeout(() => {
        drawStars()
    }, 10);
    setTimeout(() => {
        drawShips()
    }, 20);
    setTimeout(() => {
        drawBullets()
    }, 30);
}


function drawStars() {
    setInterval(() => {
        if (!isEmpty(player)) {
            backgroundC.save();
            backgroundC.beginPath();
            backgroundC.clearRect(0, 0, screenWidth, screenHeight)
            backgroundC.restore();

            player.stars.forEach(elem => {
                elem.stars.forEach(ele => {
                    let screenPosition = convertPosToPixel(ele.x, ele.y, player.ship)
                    if (screenPosition.x <= screenWidth || screenPosition.y <= screenHeight) {
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
        }
    }, 30);
}

function drawShips() {
    setInterval(() => {
        if (ships.length > 0 && !isEmpty(player)) {
            shipsC.clearRect(0, 0, screenWidth, screenHeight)
            ships.forEach(elem => {
                if (elem.id == player.ship.id) {
                    player.ship = elem
                }
                shipsC.save();
                shipsC.beginPath();
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                shipsC.translate(screenPosition.x, screenPosition.y);
                shipsC.rotate(elem.angle * Math.PI / 180);
                shipsC.fillStyle = "white";
                shipsC.rect(-(elem.w * elem.size * zoom / 2), -(elem.h * elem.size * zoom / 2), elem.w * elem.size * zoom, elem.h * elem.size * zoom);
                //backgroundC.drawImage(ele.img, -15, -15, 30, 30);
                shipsC.fill();
                shipsC.restore();

                // username
                shipsC.save();
                shipsC.beginPath();
                shipsC.font = "15px Arial";
                shipsC.fillStyle = "green";
                shipsC.translate(screenPosition.x, screenPosition.y + 30);
                shipsC.textAlign = "center";
                shipsC.fillText(elem.username, 0, 0)
                shipsC.restore();
            })
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
                bulletsC.fillStyle = '#FF5500'
                bulletsC.rect(-(elem.w / 2), -(elem.h / 2), elem.w * zoom, elem.h * zoom);
                bulletsC.fill();
                bulletsC.restore();
            })
        }
    }, 30);

}