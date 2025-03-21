const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = innerWidth - 10;
canvas.height = innerHeight - 15;

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

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hit = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.hit ? "#fff" : "blue";
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
        ctx.fillStyle = "red";
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
        if (this.x - this.radius / 2 > paddle.x && this.x + this.radius / 2 < paddle.x + paddle.width && this.y + this.radius >= paddle.y) {
            this.dy *= -1;
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
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    move() {
        if (rightPressed) {
            this.x += 7;
            if (this.x + this.width > canvas.width - 10) {
                this.x = canvas.width - this.width - 10;
            }
        } else if (leftPressed) {
            this.x -= 7;
            if (this.x < 0) {
                this.x = 0;
            }
        }
    }
}

const rectangles = [];
const cols = 10;
const rows = 4;
const rectWidth = canvas.width / cols;
const rectHeight = 50;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        rectangles.push(new Rectangle(col * rectWidth, row * rectHeight * 1.1, rectWidth - 15, rectHeight - 4));
    }
}

const ball = new Ball(300, 350, 10, 2, -2);
const paddle = new Paddle(innerWidth / 2, innerHeight - 100, 100, 10);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectangles.forEach(rect => rect.draw(ctx));

    ball.move();
    ball.draw(ctx);

    paddle.draw(ctx);
    paddle.move();

    rectangles.forEach(rect => {
        if (!rect.hit && rect.checkCollision(ball)) {
            rect.hit = true;
            ball.dy *= -1;
        }
    });

    ball.checkCollision(paddle);

    requestAnimationFrame(update);
}

update();