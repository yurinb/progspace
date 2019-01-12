const canvas = document.querySelector('canvas')
const bulletsCanvas = document.createElement('canvas')
const shipsCanvas = document.createElement('canvas')
canvas.style.backgroundColor = '#020202'

const screenHeight = window.innerHeight
const screenWidth = window.innerWidth

canvas.height = screenHeight
bulletsCanvas.height = screenHeight
shipsCanvas.height = screenHeight

canvas.width = screenWidth
bulletsCanvas.width = screenWidth
shipsCanvas.width = screenWidth

canvas.style.zIndex = '1'
bulletsCanvas.style.zIndex = '2'
shipsCanvas.style.zIndex = '3'


const backgroundC = canvas.getContext('2d')
const bulletsC = bulletsCanvas.getContext('2d')
const shipsC = shipsCanvas.getContext('2d')

let mousePosition = {
    x: 0,
    y: 0
}

let score = {}
let player = {}
let ships = []
let bullets = []
let stars = []
let particles = []


document.body.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(shipsCanvas, evt);

    mousePosition.x = mousePos.x
    mousePosition.y = mousePos.y
console.log(player, ships, stars);

    if (!player.ship) {
        return
    }
    player.ship.angle = getPlayerAngle()
}, false);



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
    document.body.appendChild(shipsCanvas);
    document.body.appendChild(bulletsCanvas);
    setTimeout(() => {
        writeObjects()
    }, 10);
    setTimeout(() => {
        emitAngle()
    }, 20);
}