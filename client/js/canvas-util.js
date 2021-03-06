// Returns x and y of mouse position on canvas screen
function getMousePos(canvas, evt) {
	let rect = canvasElements.canvas.getBoundingClientRect()
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	}
}

// Returns the angle between player unit and mouse-canvas position
function getPlayerAngle() {
	let unit = {
		x: canvasElements.canvas.width / 2,
		y: canvasElements.canvas.height / 2
	}
	let mouse = {
		x: mousePosition.x,
		y: mousePosition.y
	}
	let angle = Math.atan2(mouse.y - unit.y, mouse.x - unit.x) * 180 / Math.PI
	if (angle < 0) {
		angle += 360
	}

	return Math.floor(angle)
}

// zoom variable is used on next method(convertPosToPixel)
// when less the number, more objects will fit on screen
let zoom = 0.05
window.addEventListener('mousewheel', function (e) {
	if (e.wheelDelta < 0 && zoom > 0.05) {
		zoom = Math.round( (zoom - 0.01) * 100 + Number.EPSILON ) / 100
	} else if (e.wheelDelta > 0 && zoom < 0.25) {
		zoom = Math.round( (zoom + 0.01) * 100 + Number.EPSILON ) / 100
	}
})

// Convert and returns the position of objects to fit in screen
// every object has postions, but to show up on screen they have to be close to player unit
// if player unit position is x3000 y5000 and screen have max x = 1366 y = 766
// the position x3000 y5000 will be equivalent to screen x = 1366/2 y = 766/2
// so, player unit is allways at x1366/2 y = 766/2
// objects that position is close enough of player unit and match max screen size will show up
function convertPosToPixel(x, y, playerShip, parallax = 1) { // 

	let canvasCenterX = canvasElements.canvas.width / 2
	let canvasCenterY = canvasElements.canvas.height / 2

	let diffX = (x - playerShip.x) * parallax * zoom
	let diffY = (y - playerShip.y) * parallax * zoom

	return {
		//x: diffX + canvasCenterX,
		//y: diffY + canvasCenterY
		// x: Math.floor(diffX + canvasCenterX),
		x: diffX + canvasCenterX,
		// x: Math.floor(Math.round( (diffX + canvasCenterX) * 100 + Number.EPSILON ) / 100),
		y: diffY + canvasCenterY
		// y: Math.floor(Math.round( (diffY + canvasCenterY) * 100 + Number.EPSILON ) / 100)
	}
}

// TODO: move this to some util module
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false
	}
	return true
}