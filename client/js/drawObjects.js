function writeObjects() {
    c.save();
    c.beginPath();
    c.clearRect(0, 0, screenWidth, screenHeight)
    c.restore();

    drawStars()
    drawShips()
    drawBullets()
}

function drawStars() {
    if (!isEmpty(player)) {
        stars.forEach(element => {
            element.stars.forEach(elem => {
                c.save();
                //c.beginPath();
                c.fillStyle = "rgba(" + elem.r + ", " + elem.g + ", " + elem.b + ", " + elem.z * (Math.random() * 0.25) + ")"
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                c.translate(screenPosition.x, screenPosition.y);
                c.fillRect(0, 0, elem.s, elem.s)
                //c.fillText(elem.x + ' ' + elem.y, screenPosition.x, screenPosition.y)
                c.restore();
            })
        })
    }
}

function drawShips() {
    if (ships.length > 0 && !isEmpty(player)) {
        if (player.isConnected) {
            ships.forEach(elem => {
                if (elem.id == player.ship.id) {
                    player.ship = elem
                }
                c.save();
                c.beginPath();
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                c.translate(screenPosition.x, screenPosition.y);
                c.rotate(elem.angle * Math.PI / 180);
                c.fillStyle = "white";
                c.rect(-(elem.w * elem.size / 2), -(elem.h * elem.size / 2), elem.w * elem.size, elem.h * elem.size);
                //c.drawImage(ele.img, -15, -15, 30, 30);
                c.fill();
                c.restore();

                // username
                c.save();
                c.beginPath();
                c.font = "15px Arial";
                c.fillStyle = "green";
                c.translate(screenPosition.x, screenPosition.y + 30);
                c.textAlign = "center";
                c.fillText(elem.username, 0, 0)
                c.restore();
            })
        }
    }
}

function drawBullets() {
    if (!isEmpty(player) && !isEmpty(bullets)) {
        bullets.forEach(elem => {
            c.save();
            c.beginPath();
            let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
            c.translate(screenPosition.x, screenPosition.y);
            c.rotate(elem.angle * Math.PI / 180);
            c.fillStyle = elem.color
            c.fillStyle = '#FF5500'
            c.rect(-(elem.w / 2), -(elem.h / 2), elem.w, elem.h);
            c.fill();
            c.restore();
        })
    }
}