var score = 0;
var speed = 750;
var area = 0;
var iteration = 10;

function gameBegin() {
    document.body.removeChild(document.getElementById('button'));

    document.getElementById('score').style.visibility = "visible";

    for (var i = 0; i <= iteration; i++) {
        setTimeout(buildRectangle, speed * i);
    }

    setTimeout(endGame, speed * (iteration + 1));
}

function buildRectangle() {
    var height = Math.random() * 200;
    var width = Math.random() * 200;

    if (height < 50) {
        height = 50;
    }
    if (width < 50) {
        width = 50;
    }

    var posX = Math.floor(Math.random() * window.innerWidth);
    var posY = Math.floor(Math.random() * window.innerHeight);

    area = parseInt(height * width / 100);

    if (posX > 200 && posY > 200) {
        posX = 200 + posX * 1.5;
        posY = 200 + posY * 1.5;
    }

    if (posX > window.innerWidth - 100) {
        posX = window.innerWidth - 150;
    } else if (posX < 50) {
        posX = 50 + posX * 1.5;
    }

    if (posY > window.innerHeight - 100) {
        posY = window.innerHeight - 250;
    } else if (posY < 120) {
        posY = 120 + posY * 1.5;
    }

    var colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white"];
    var color = colors[Math.floor(Math.random() * colors.length)];

    var shape = document.createElement("div");
    shape.id = "rectangle";
    shape.style.width = width + "px";
    shape.style.height = height + "px";
    shape.style.backgroundColor = color;
    shape.style.position = "absolute";
    shape.style.left = posX + "px";
    shape.style.borderRadius = "10px";
    shape.style.top = posY + "px";
    document.body.appendChild(shape);

    shape.addEventListener("click", updateScore);
    removeRectangle();
}

function updateScore() {
    score = score + (500 - area);
    speed = speed - 75;
    document.getElementById("scoreNum").innerHTML = score.toString();
}

function removeRectangle() {
    setTimeout(function () {
        document.body.removeChild(rectangle);
    }, 750);
}

function endGame() {
    document.getElementById('score').style.visibility = "hidden";
    document.getElementById('endGame').style.visibility = "visible";
    document.getElementById("finalScore").innerHTML = score.toString();
}