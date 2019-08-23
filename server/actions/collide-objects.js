// circle collider
function elementCollidesWithShip(element, collidedWith) {
	let eC = {
		x: element.x,
		y: element.y,
		r: (element.w + element.h) / 2
	}
	for (let i = 0; i < global.gameObjects.units.length; i++) {
		let unit = global.gameObjects.units[i]
		let verify = true
		if (unit.state == 'dead' || unit.state == 'removible') verify = false

		if (verify && element.username != unit.username || unit.isMeteor || element.isMeteor && unit.isPlayer) {

			if (element.isMeteor && unit.isMeteor && unit.id == element.id) verify = false

			if (verify) {

				let sC = {
					x: unit.x,
					y: unit.y,
					r: (unit.w + unit.h) / 2
				}

				if (collision(eC.x, eC.y, eC.r, sC.x, sC.y, sC.r)) {
					collidedWith(unit)
					return true
				}
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

// rectangle collider
// function elementCollidesWithShip(element) {

//     let units = global.gameObjects.units
//     let eMinX = element.x - element.w / 2
//     let eMaxX = element.x + element.w / 2
//     let eMinY = element.y - element.h / 2
//     let eMaxY = element.y + element.h / 2
//     for (let index = 0; index < units.length; index++) {
//         let sMinX = units[index].x - units[index].w / 2
//         let sMaxX = units[index].x + units[index].w / 2
//         let sMinY = units[index].y - units[index].h / 2
//         let sMaxY = units[index].y + units[index].h / 2
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


module.exports = {
	elementCollidesWithShip
}