// Canvas
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables
const cards = [];
const cols = 4;
const rows = 2;

let countCardFlipped = 0;

let animationId;
let imgSrc;

let imagesUrl = [];
let imagesUsed = [];
let imagesFinished = [];

// CardSize
let cardSize;
if (innerHeight / rows > innerWidth / cols) {
    cardSize = innerWidth / cols - innerWidth / cols * 0.2;
} else {
    cardSize = (innerHeight - 50) / rows - innerHeight / rows * 0.2;
}

// Images
const imgLogo = new Image();
imgLogo.src = "images/logo.png";

for (let i = 1; i <= cols * rows / 2; i++) {
    imageSrc = "images/" + i + ".jpg";
    imagesUrl.push(imageSrc);
    imagesUrl.push(imageSrc);
}

// Classes
class Card {
    constructor(imageBack, x, y, width, height) {
        this.currentImage = imgLogo;
        this.imageBack = imageBack;
        this.x = x + canvas.width * 0.025;
        this.y = y + canvas.height * 0.025;
        this.width = width;
        this.height = height;
        this.isFlipped = false;
    }

    draw(ctx) {
        ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }

    flip() {
        if (countCardFlipped < 2) {
            this.isFlipped = !this.isFlipped;

            this.currentImage = this.imageBack;
            countCardFlipped++;

            if (countCardFlipped == 1) {
                imgSrc = this.currentImage.src;
                console.log(imgSrc);
                console.log(countCardFlipped);
            }

            if (countCardFlipped == 2) {
                console.log(this.currentImage.src);
                if (this.currentImage.src == imgSrc) {
                    imagesFinished.push(imgSrc);
                    console.log("takePair");
                    countCardFlipped = 0;
                }
                else {
                    setTimeout(() => {
                        cards.forEach(card => {
                            let isFinished = imagesFinished.some(finishImage => finishImage === card.currentImage.src);
                            if (!isFinished) {
                                card.currentImage = imgLogo;
                            }
                        });
                        countCardFlipped = 0;
                    }, 1000);
                    imgSrc = '';
                }
            }
        }
    }
}

// Fonctions
function addCard() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            var image = new Image();

            imagesUrl = imagesUrl.sort(() => Math.random() * 0.5);

            image.src = imagesUrl[0];
            imagesUrl.shift();

            cards.push(new Card(image, col * cardSize * 1.2, row * cardSize * 1.2, cardSize, cardSize));
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cards.forEach(card => card.draw(ctx));
    animationId = requestAnimationFrame(update);
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    cards.forEach(card => {
        if (card.isClicked(mouseX, mouseY)) {
            card.flip();
        }
    });
}

// Début du jeu
document.addEventListener("DOMContentLoaded", () => {
    imgLogo.onload = () => {
        addCard();
        update();
    };
});

canvas.addEventListener("click", handleClick);