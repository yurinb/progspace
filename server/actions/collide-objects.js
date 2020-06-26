function elementCollidesWithShip(element, collidedWith) {
	for (id in global.gameObjects.units) {
		if (global.gameObjects.units[id].state != 'alive') continue
	
		if (element.ownerID != global.gameObjects.units[id].id || global.gameObjects.units[id].isAsteroid || element.isAsteroid && global.gameObjects.units[id].isPlayer) {
	
			if (element.isAsteroid && global.gameObjects.units[id].isAsteroid && global.gameObjects.units[id].id == element.id)
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

module.exports = {
	elementCollidesWithShip
}