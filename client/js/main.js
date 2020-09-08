//-----------------------------//-------------------------------
//----- Server socket to connect at browser --------------------
// const socket = io.connect('ws://localhost:9000')
// const socket = io.connect('ws://192.168.1.67:9000')
const socket = io.connect('ws://progspace.herokuapp.com')

// game objects
let player    = {}
let units     = []
let projectiles = {}
let stars     = []
let particles = []

// canvas layers (ordered)
const canvasElements = {
	canvas          : document.querySelector('canvas'),
	unitsCanvas     : document.createElement('canvas'),
	projectilesCanvas : document.createElement('canvas'),
	interfaceCanvas : document.createElement('canvas'),
}

canvasElements.canvas.style.backgroundColor = 'rgb(0, 0, 15)'

// get canvas layer contexts
const backgroundC = canvasElements.canvas.getContext('2d')
const unitsC      = canvasElements.unitsCanvas.getContext('2d')
const projectilesC  = canvasElements.projectilesCanvas.getContext('2d')
const interfaceC  = canvasElements.interfaceCanvas.getContext('2d')

// something like anti-aliasing effect
backgroundC.imageSmoothingEnabled = false
unitsC.imageSmoothingEnabled      = false
projectilesC.imageSmoothingEnabled  = false
interfaceC.imageSmoothingEnabled  = false

function setCanvasElementsPropValue(prop, value) {
	for (const key in canvasElements) {
		if (canvasElements.hasOwnProperty(key)) {
			canvasElements[key][prop] = value
		}
	}
}

// get screen size
let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

function resizeCanvas() {
	screenHeight = window.innerHeight
	screenWidth  = window.innerWidth
	
	setCanvasElementsPropValue('height', screenHeight)
	setCanvasElementsPropValue('width', screenWidth)
}

resizeCanvas()

window.onresize = resizeCanvas

// order canvas to act like layers
let index = 0
for (const key in canvasElements) {
	if (canvasElements.hasOwnProperty(key)) {
		index++
		canvasElements[key].style.zIndex = index
	}
}

// setting some game variables
let mousePosition = {
	x: 0,
	y: 0
}

// capture mouse move event and update mouse position variables
document.body.addEventListener('mousemove', function (evt) {
	var mousePos = getMousePos(canvasElements.unitsCanvas, evt)

	mousePosition.x = mousePos.x
	mousePosition.y = mousePos.y

	if (!player.unit) {
		return
	}
	//realtime angle
	//player.unit.a = getPlayerAngle()
}, false)


// login screen actions
const modal = document.getElementById('login-container')

function showLoginModal() {
	modal.style.display = 'block'
}

function hideLoginModal() {
	modal.style.display = 'none'
	document.body.removeChild(modal)
}

showLoginModal()

// override this variable will print his value on screen
let debbugingOnScreen = false

function userLoggedIn() {

	hideLoginModal()

	for (const key in canvasElements) {
		if (canvasElements.hasOwnProperty(key)) {
			document.body.appendChild(canvasElements[key])
		}
	}

	// canvasElements.canvas.x = 0

	setCanvasElementsPropValue('x', 0)
	setCanvasElementsPropValue('y', 0)

	setTimeout(() => {
		drawObjects()
	}, 10)
	
	setTimeout(() => {
		emitAngle()
	}, 20)
}

