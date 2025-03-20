function resizeCanvas() {
    const canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 5;
var dy = -5;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var posRecX = 40;
var posRecY = 40;

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight * 2, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawRectangle() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 4; j++) {
            ctx.beginPath();
            ctx.rect(posRecX, posRecY, 120, 40);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
            posRecY += 60
        }
        posRecY = 40;
        posRecX += 148;
    }

    posRecX = 40;
    posRecY = 40;
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    detectCollision();
    drawRectangle();
    drawBall();
    drawPaddle();
    movePaddle();
    x += dx;
    y += dy;
}

function detectCollision() {
    if (x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < 0 + ballRadius) {
        dy = -dy;
    }

    if (x > paddleX + ballRadius && x < paddleX + paddleWidth && y > canvas.height - paddleHeight * 2) {
        dy = -dy;
    }

    console.log('y' + y);

    if (y + ballRadius + 3 >= canvas.height) { // problèmes
        alert("Game Over"); 
    }

}

function movePaddle() {
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    } else {
        paddleX = paddleX;
    }
}

setInterval(draw, 10);