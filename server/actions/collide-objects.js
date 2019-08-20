function elementCollidesWithShip(element, collidedWith) {
	let eC = {
		x: element.x,
		y: element.y,
		r: (element.w + element.h) / 2
	}
	for (let i = 0; i < global.gameObjects.ships.length; i++) {
		let ship = global.gameObjects.ships[i]
		if (element.username != ship.username) {
			let sC = {
				x: ship.x,
				y: ship.y,
				r: (ship.w + ship.h) / 2
			}

			if (collision(eC.x, eC.y, eC.r, sC.x, sC.y, sC.r)) {
				collidedWith(ship)
				return true
			}
		}
	}
	return false
}

function collision(p1x, p1y, r1, p2x, p2y, r2) {
	var a
	var x
	var y

	a = r1 + r2
	x = p1x - p2x
	y = p1y - p2y

	if (a > Math.sqrt((x * x) + (y * y))) {
		return true
	} else {
		return false
	}
}

//collides rectangle
// function elementCollidesWithShip(element) {

//     let ships = global.gameObjects.ships
//     let eMinX = element.x - element.w / 2
//     let eMaxX = element.x + element.w / 2
//     let eMinY = element.y - element.h / 2
//     let eMaxY = element.y + element.h / 2
//     for (let index = 0; index < ships.length; index++) {
//         let sMinX = ships[index].x - ships[index].w / 2
//         let sMaxX = ships[index].x + ships[index].w / 2
//         let sMinY = ships[index].y - ships[index].h / 2
//         let sMaxY = ships[index].y + ships[index].h / 2
//         if (
//             eMaxX >= sMinX &&
//             eMinX <= sMaxX &&
//             eMaxY >= sMinY &&
//             eMinY <= sMaxY
//         ) {
//             return true
//         }
//     }
//     return false
// }


module.exports = {elementCollidesWithShip}