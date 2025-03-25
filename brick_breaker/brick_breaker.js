const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;

var rightPressed = false;
var leftPressed = false;

window.addEventListener("resize", () => {
    location.reload();
});
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
var time = 0;
let animationId;

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x + canvas.width * 0.025;
        this.y = y + canvas.height * 0.025;
        this.width = width;
        this.height = height;
        this.hit = false;
    }

    draw(ctx) {
        if (!this.hit) {
            const img = new Image();
            img.src = "assets/brick.png";
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
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
        const img = new Image();
        img.src = "assets/ball.png";
        ctx.drawImage(img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.dx *= -1;
        }
        if (this.y - this.radius < 0) {
            this.dy *= -1;
        }
    }

    checkCollision(paddle) {
        if (
            this.x + this.radius > paddle.x &&
            this.x < paddle.x + paddle.width &&
            this.y + this.radius > paddle.y &&
            this.y - this.radius < paddle.y + paddle.height
        ) {
            this.dx = 8 * ((this.x - (paddle.x + paddle.width / 2)) / paddle.width);
            this.dy *= -1
            this.y = paddle.y - this.radius;
        }

        if (this.y - 2 * this.radius > innerHeight) {
            score = 'Game Over';
            end();
            document.getElementById("gameOverButton").style.visibility = "visible";
            cancelAnimationFrame(animationId);
        }
    }
}

class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y - 45;
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
            this.x += 15;
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
            }
        } else if (leftPressed) {
            this.x -= 15;
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
    if (score !== "win") {
        ctx.fillText(score, canvas.width / 2, canvas.height / 1.85);
    }
}

const rectangles = [];
const cols = Math.floor(innerWidth / 200);
const rows = 5;
const rectWidth = (canvas.width * 0.95) / cols;
const rectHeight = 38;

function endGame() {
    if (score == cols * rows) {
        score = 'win';
        end();
        cancelAnimationFrame(animationId);
        explode();
        animate();
        clearInterval(timer);
    }
}

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        rectangles.push(new Rectangle(col * rectWidth * 1.035, row * rectHeight * 1.7, rectWidth - 65, rectHeight));
    }
}

var widthPaddle = Math.floor(innerWidth / 150)
const paddle = new Paddle(innerWidth / 2, innerHeight - 100, 125, 10);

var posXBall = Math.floor(Math.random() * (canvas.width - 150) + 150);
var posYBall = Math.floor(Math.random() * (canvas.height - 50) + 50);

if (posYBall < 8 * rectHeight) {
    posYBall = canvas.height / 2;
}
if (posYBall > canvas.height - 3 * paddle.height) {
    posYBall = canvas.height / 2;
}

const ball = new Ball(posXBall, posYBall, 10, 8, -8);

function update() {
    if (score !== "Game Over" && score !== "win") {
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

        endGame();
        animationId = requestAnimationFrame(update);
    }
}

function end() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    writeText();
    paddle.draw(ctx);
}

update();

// Feux d'artifice
const gravity = 0.05;
const friction = 0.99;
let particles = [];
let particleCount = 1000;
let mouse;

class Particle {
    constructor(x, y, r, color, velocity) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.dx = velocity.x;
        this.dy = velocity.y;
        this.opacity = 1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }
    updateFD() {
        this.draw();
        this.dy += gravity;

        this.dx *= friction;
        this.dy *= friction;

        this.x += this.dx;
        this.y += this.dy;

        this.opacity -= 0.01;
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(231, 236, 239, 0.1)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle, i) => {
        if (particle.opacity > 0) {
            particle.updateFD();
        } else {
            particles.splice(i, 1);
        }
    });

    if (particles.length === 0 && score === "win") {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#8B8C89";
        ctx.font = "bold 80px Impact";
        ctx.textAlign = "center";
        ctx.fillText('You win in ' + time + 's', canvas.width / 2, canvas.height / 2);
        ctx.restore();

        document.getElementById("gameOverButton").style.visibility = "visible";
    }
}

function explode(x = canvas.width / 2, y = canvas.height / 2) {
    let speed = 40;
    let angleIncrement = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
        particles.push(
            new Particle(x, y, 2, `hsl(${Math.random() * 360}, 50%, 50%)`, {
                x: Math.cos(angleIncrement * i) * Math.random() * speed,
                y: Math.sin(angleIncrement * i) * Math.random() * speed
            })
        );
    }
}

const timer = setInterval(() => {
    time++;
}, 1000);