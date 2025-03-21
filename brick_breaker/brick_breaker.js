const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "ArrowRight" || e.key === "Right") {
        rightPressed = true;
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "ArrowRight" || e.key === "Right") {
        rightPressed = false;
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
        leftPressed = false;
    }
}

var score = 0;

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x + canvas.width * 0.025;
        this.y = y + canvas.height * 0.025;
        this.width = width;
        this.height = height;
        this.hit = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.hit ? "#E7ECEF" : "#274C77";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(ball) {
        return (
            ball.x + ball.radius > this.x &&
            ball.x - ball.radius < this.x + this.width &&
            ball.y + ball.radius > this.y &&
            ball.y - ball.radius < this.y + this.height
        );
    }
}

class Ball {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw(ctx) {
        ctx.fillStyle = "#A3CEF1";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy *= -1;
        }
    }

    checkCollision(paddle) {
        if (this.x - this.radius > paddle.x && this.x + this.radius < paddle.x + paddle.width && this.y + this.radius >= paddle.y) {
            this.dy *= -1;
        }

        console.log(this.y + this.radius, paddle.y);

        if (this.y - this.radius * 1.1 >= paddle.y) {
            score = 'Game Over';
            cancelAnimationFrame(update);
            document.getElementById("gameOverButton").style.visibility = "visible";
        }
    }

    checkEndGame() { }
}

class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.fillStyle = "#8B8C89";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    move() {
        if (rightPressed) {
            this.x += 12;
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
            }
        } else if (leftPressed) {
            this.x -= 12;
            if (this.x < 0) {
                this.x = 0;
            }
        }
    }
}

function writeText() {
    ctx.fillStyle = "#8B8C89";
    ctx.font = "bold 80px Impact";
    ctx.textAlign = "center";
    ctx.fillText(score, canvas.width / 2, canvas.height / 2);
}

const rectangles = [];
const cols = 10;
const rows = 4;
const rectWidth = (canvas.width * 0.95) / cols;
const rectHeight = 50;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        rectangles.push(new Rectangle(col * rectWidth, row * rectHeight * 1.3, rectWidth - 20, rectHeight));
    }
}

const ball = new Ball(300, 350, 10, 8, -8);
const paddle = new Paddle(innerWidth / 2, innerHeight - 100, 125, 10);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectangles.forEach(rect => rect.draw(ctx));

    writeText();

    ball.move();
    ball.draw(ctx);

    paddle.draw(ctx);
    paddle.move();

    rectangles.forEach(rect => {
        if (!rect.hit && rect.checkCollision(ball)) {
            rect.hit = true;
            ball.dy *= -1;
            score++;
        }
    });

    ball.checkCollision(paddle);

    requestAnimationFrame(update);
}

update();