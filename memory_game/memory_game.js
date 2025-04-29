var colsNum = 5;
var rowsNum = 5;

function takeValues() {
    colsNum = parseInt(document.getElementById("cols").value);
    rowsNum = parseInt(document.getElementById("rows").value);
}

function beginGame() {
    document.getElementById("myCanvas").style.visibility = "visible";
    document.getElementById("cols").style.visibility = "hidden";
    document.getElementById("rows").style.visibility = "hidden";
    document.getElementById("buttonChoice").style.visibility = "hidden";

    // Canvas
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Variables
    var cards = [];
    var cols = colsNum;
    var rows = rowsNum;

    if (cols * rows % 2 !== 0) {
        cols += 1;
    }

    let countCardFlipped = 0;
    let tried = 0;

    let animationId;
    let imagesUrl = [];
    let imagesFinished = [];
    let flippedCards = [];

    // CardSize
    let cardSize;
    if (innerHeight / rows > innerWidth / cols) {
        cardSize = innerWidth / cols - innerWidth / cols * 0.2;
    } else {
        cardSize = (innerHeight - innerHeight*0.18) / rows - innerHeight / rows * 0.2;
    }

    const margin = (innerWidth - cols * cardSize * 1.2) / 2;

    // Images
    const imgLogo = new Image();
    imgLogo.src = "images/logo.png";

    for (let i = 1; i <= cols * rows / 2; i++) {
        let imageSrc = "images/" + i + ".jpg";
        imagesUrl.push(imageSrc, imageSrc);
    }

    // Classe Card
    class Card {
        constructor(imageBack, x, y, width, height) {
            this.currentImage = imgLogo;
            this.imageBack = imageBack;
            this.x = x + margin;
            this.y = y + canvas.height * 0.025;
            this.width = width;
            this.height = height;
            this.isFlipped = false;
        }

        draw(ctx) {
            ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
        }

        isClicked(mouseX, mouseY) {
            return (
                mouseX >= this.x &&
                mouseX <= this.x + this.width &&
                mouseY >= this.y &&
                mouseY <= this.y + this.height
            );
        }

        flip() {
            if (!this.isFlipped && flippedCards.length < 2) {
                this.isFlipped = true;
                this.currentImage = this.imageBack;
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 1000);
                }
            }
        }
    }

    // Vérifie si les cartes sont identiques
    function checkMatch() {
        tried++;
        let [card1, card2] = flippedCards;

        if (card1.imageBack.src === card2.imageBack.src) {
            imagesFinished.push(card1.imageBack.src);
            countCardFlipped += 2;
        } else {
            card1.isFlipped = false;
            card2.isFlipped = false;
            card1.currentImage = imgLogo;
            card2.currentImage = imgLogo;
        }

        flippedCards = [];

        if (countCardFlipped === cols * rows) {
            setTimeout(endGame, 1000);
            cancelAnimationFrame(animationId);
        }
    }

    // Ajoute les cartes
    function addCard() {
        imagesUrl = shuffleArray(imagesUrl);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let image = new Image();
                image.src = imagesUrl.pop();
                cards.push(new Card(image, col * cardSize * 1.2, row * cardSize * 1.2, cardSize, cardSize));
            }
        }
    }

    // Mélange les images
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Met à jour le canvas
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cards.forEach(card => card.draw(ctx));
        animationId = requestAnimationFrame(update);
    }

    // Gère le clic sur une carte
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

    // Fin du jeu
    function endGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Impact";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Bravo, vous avez gagné !", canvas.width / 2, canvas.height / 2.6);
        ctx.font = "25px Impact";
        ctx.fillText(`Vous avez trouvé ${cols * rows / 2} paires en ${tried} coups.`, canvas.width / 2, canvas.height / 2.4);
        ctx.fillText(`Efficacité : ${(cols * rows / 2 / tried * 100).toFixed(2)}%`, canvas.width / 2, canvas.height / 2.2);
        document.getElementById("endGame").style.visibility = "visible";
    }

    canvas.addEventListener("click", handleClick);

    imgLogo.onload = () => {
        addCard();
        update();
    };

    takeValues();
}

// Démarrage du jeu
document.addEventListener("DOMContentLoaded", () => {
    takeValues();
});