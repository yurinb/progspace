const canvas = document.querySelector('canvas')
const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
canvas.height = screenHeight
canvas.width = screenWidth
const c = canvas.getContext('2d')

let mousePosition = {}

let score = {}
let player = {}
let ships = []
let bullets = []
let stars = []
let particles = []

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    
    mousePosition = {
        x: mousePos.x,
        y: mousePos.y
    }
    if (!player.ship) {
        return
    }
    player.ship.angle = getPlayerAngle()
}, false);


function startLoop() {
    requestAnimationFrame(startLoop)
    writeObjects()
    if (!player.ship) {
        return
    }
    emitAngle()
}

const modal = document.getElementById('myModal');

function showLoginModal() {
    modal.style.display = "block";
}

function hideLoginModal() {
    modal.style.display = "none";
}

showLoginModal()

function userLoggedIn() {
    hideLoginModal()
    startLoop()
}
