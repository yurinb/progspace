//-----------------------------//-------------------------------
//----- Server socket to connect at browser --------------------
const socket = io.connect('http://localhost:9000')
//const socket = io.connect("http://192.168.15.15:9000");
//const socket = io.connect("http://outspace.herokuapp.com");
//const socket = io.connect("http://mussum.ddns.net:9000");

// game objects
let score     = {}
let player    = {}
let ships     = []
let bullets   = []
let stars     = []
let particles = []

// canvas layers (ordered)
const canvasElements = {
	canvas          : document.querySelector('canvas'),
	meteorsCanvas   : document.createElement('canvas'),
	shipsCanvas     : document.createElement('canvas'),
	bulletsCanvas   : document.createElement('canvas'),
	interfaceCanvas : document.createElement('canvas'),
}

canvasElements.canvas.style.backgroundColor = '#020202'

// get canvas layer contexts
const backgroundC = canvasElements.canvas.getContext('2d')
const meteorsC    = canvasElements.meteorsCanvas.getContext('2d')
const shipsC      = canvasElements.shipsCanvas.getContext('2d')
const bulletsC    = canvasElements.bulletsCanvas.getContext('2d')
const interfaceC  = canvasElements.interfaceCanvas.getContext('2d')

// something like anti-aliasing effect
backgroundC.imageSmoothingEnabled = false
meteorsC.imageSmoothingEnabled    = false
shipsC.imageSmoothingEnabled      = false
bulletsC.imageSmoothingEnabled    = false
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

// periodically check if screen size changed to resize canvas
setInterval(() => {
	if (screenHeight != window.innerHeight || screenWidth  != window.innerWidth) {
		resizeCanvas()
	}
}, 250)

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
	var mousePos = getMousePos(canvasElements.shipsCanvas, evt)

	mousePosition.x = mousePos.x
	mousePosition.y = mousePos.y

	if (!player.ship) {
		return
	}
	//realtime angle
	//player.ship.angle = getPlayerAngle()
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
		writeObjects()
	}, 10)
	
	setTimeout(() => {
		emitAngle()
	}, 20)
}

