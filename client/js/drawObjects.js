function writeObjects() {
    c.save();
    c.beginPath();
    c.clearRect(0, 0, screenWidth, screenHeight)
    c.restore();

    drawStars()
    drawShips()
    drawBullets()

    //drawPlayer()

    
}

function drawStars() {
    if (isEmpty(player)) {
        stars.forEach(element => {
            element.stars.forEach(elem => {
                c.save();
                c.beginPath();
                c.fillStyle = "rgba(" + elem.r + ", " + elem.g + ", " + elem.b + ", " + elem.z * 0.25 + ")"
                let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
                c.translate(screenPosition.x, screenPosition.y);
                c.fillRect(screenPosition.x, screenPosition.y, elem.s + Math.random() * 2, elem.s + Math.random() * 2)
                //c.fillText(elem.x + ' ' + elem.y, screenPosition.x, screenPosition.y)
                c.restore();
            })
        })
    }
}

function drawShips() {
    //console.log('player = ', isEmpty(player));
    
    if (ships.length > 0 && !isEmpty(player)) {
        
        ships.forEach(elem => {
            console.log('ship');
            console.log(elem);

            if (elem.id == player.ship.id) {
                player.ship = elem
            }
            c.save();
            c.beginPath();
            let screenPosition = convertPosToPixel(elem.x, elem.y, player.ship)
            c.translate(screenPosition.x, screenPosition.y);
            c.rotate(elem.angle * Math.PI / 180);
            c.fillStyle = "red";
            c.rect(-(elem.w / 2), -(elem.h / 2), elem.w, elem.h);
            //c.drawImage(ele.img, -15, -15, 30, 30);
            c.fill();
            c.restore();
            
            c.save();
            c.beginPath();
            c.fillStyle = "white";
            c.translate(screenPosition.x, screenPosition.y);
            c.fillText(elem.username, 0, 0)
            c.restore();
        })
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
            c.rect(-(elem.w / 2), -(elem.h / 2), elem.w, elem.h);
            c.fill();
            c.restore();
        })
    }
}

function drawPlayer() {
    if (isEmpty(player)) {
        let screenPosition = convertPosToPixel(player.ship.x, player.ship.y, player.ship)
        c.save();
        c.beginPath();
        c.translate(screenPosition.x, screenPosition.y);
        c.rotate(player.ship.angle * Math.PI / 180);
        c.fillStyle = "blue";
        c.rect(-(player.ship.w / 2), -(player.ship.h / 2), player.ship.w, player.ship.h);
        //c.drawImage(img, -(player.ship.w /2), -(player.ship.h /2), player.ship.w, player.ship.h);
        c.fill();
        c.restore();
    }
}