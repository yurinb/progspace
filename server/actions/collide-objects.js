// circle collider
function elementCollidesWithShip(element, collidedWith) {
	for (id in global.gameObjects.units) {
		if (global.gameObjects.units[id].state != 'alive') continue
	
		if (element.username != global.gameObjects.units[id].username || global.gameObjects.units[id].isMeteor || element.isMeteor && global.gameObjects.units[id].isPlayer) {
	
			if (element.isMeteor && global.gameObjects.units[id].isMeteor && global.gameObjects.units[id].id == element.id)
				continue
	
				if (collision(element.x, element.y, (element.w + element.h) / 2, global.gameObjects.units[id].x, global.gameObjects.units[id].y, (global.gameObjects.units[id].w + global.gameObjects.units[id].h) / 2)) {
					collidedWith(global.gameObjects.units[id])
					return true
				}
			}
		}

	return false
}

function collision(p1x, p1y, r1, p2x, p2y, r2) {
	if (r1 + r2 > Math.sqrt(((p1x - p2x) * (p1x - p2x)) + ((p1y - p2y) * (p1y - p2y)))) {
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