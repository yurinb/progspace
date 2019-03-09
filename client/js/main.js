//-----------------------------//-------------------------------
//----- Server socket to connect at browser --------------------
//const socket = io.connect("http://localhost:9000");
//const socket = io.connect("http://192.168.15.15:9000");
const socket = io.connect("http://outspace.herokuapp.com");


const canvas          = document.querySelector('canvas')
const bulletsCanvas   = document.createElement('canvas')
const shipsCanvas     = document.createElement('canvas')
const interfaceCanvas = document.createElement('canvas')

canvas.style.backgroundColor = '#020202'

// get screen size
let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

function resizeCanvas() {
    screenHeight = window.innerHeight
    screenWidth  = window.innerWidth

    canvas.height          = screenHeight
    bulletsCanvas.height   = screenHeight
    shipsCanvas.height     = screenHeight
    interfaceCanvas.height = screenHeight
    
    canvas.width          = screenWidth
    bulletsCanvas.width   = screenWidth
    shipsCanvas.width     = screenWidth
    interfaceCanvas.width = screenWidth
}
resizeCanvas()

// periodically check if screen size changed
// resize canvas if true
setInterval(() => {
    if (screenHeight != window.innerHeight || screenWidth  != window.innerWidth) {
        resizeCanvas()
    }
}, 250);

// order canvas to act like layers
canvas.style.zIndex          = '1'
bulletsCanvas.style.zIndex   = '2'
shipsCanvas.style.zIndex     = '3'
interfaceCanvas.style.zIndex = '4'

// get canvas layer contexts
const backgroundC = canvas.getContext('2d')
const bulletsC    = bulletsCanvas.getContext('2d')
const shipsC      = shipsCanvas.getContext('2d')
const interfaceC  = interfaceCanvas.getContext('2d')

// something like anti-aliasing effect
backgroundC.imageSmoothingEnabled = false;
bulletsC.imageSmoothingEnabled    = false;
shipsC.imageSmoothingEnabled      = false;
interfaceC.imageSmoothingEnabled  = false;


// setting some game variables
let mousePosition = {
    x: 0,
    y: 0
}

let score     = {}
let player    = {}
let ships     = []
let bullets   = []
let stars     = []
let particles = []
// ----------------------------

// capture mouse move event and update mouse position variables
document.body.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(shipsCanvas, evt);

    mousePosition.x = mousePos.x
    mousePosition.y = mousePos.y

    if (!player.ship) {
        return
    }
    //realtime angle
    //player.ship.angle = getPlayerAngle()
}, false);


// login screen actions
const modal = document.getElementById('login-container');

function showLoginModal() {
    modal.style.display = "block";
}

function hideLoginModal() {
    modal.style.display = "none";
    document.body.removeChild(modal)
}

showLoginModal()

function userLoggedIn() {
    hideLoginModal()
    document.body.appendChild(shipsCanvas);
    document.body.appendChild(bulletsCanvas);
    document.body.appendChild(interfaceCanvas);
    canvas.x = 0
    setTimeout(() => {
        writeObjects()
    }, 10);
    setTimeout(() => {
        emitAngle()
    }, 20);
}