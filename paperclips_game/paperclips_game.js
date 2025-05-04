// Variables
var paperclips = 0;
var paperclipsTotal = 0;
var paperclipsProduce = 0;

var production = 0;
var paperclipPrice = 1;

var interval_selling = 0;
var speed_selling = 0;
var paperclip_selling = 0;
var income = 0;
var quantity = 1;

var money = 0;

var price_autoclicker = 1;
var rendement_autoclicker = 0;

var wordOfMouth = 1;
var price_wordOfMouth = 5;

var marketing = 1;
var price_marketing = 200;

var shops = 1;
var price_shops = 1500;

let intervalId;

function init() {
    document.getElementById("price").innerHTML = paperclipPrice.toFixed(2).toString();
    document.getElementById("money").innerHTML = money.toFixed(2).toString();

    loadGame();
    calculate_interval_selling();
}

function add_paperclip() {
    paperclips += 1;
    paperclipsTotal += 1;
    document.getElementById("paperclips_produce").innerHTML = paperclipsTotal.toFixed(0).toString();
    document.getElementById("paperclips").innerHTML = paperclips.toFixed(0).toString();
}

function calculate_production() {
    production = (paperclipsTotal - paperclipsProduce);
    paperclipsProduce = paperclipsTotal;
    document.getElementById("paperclips_production").innerHTML = production.toFixed(0).toString();
}

// Price
function increase_price() {
    paperclipPrice = Math.round((paperclipPrice + 0.01) * 100) / 100;
    document.getElementById("price").innerHTML = paperclipPrice.toString();
    calculate_interval_selling();
    calculate_price_speed_selling();
}

function decrease_price() {
    paperclipPrice = Math.round((paperclipPrice - 0.01) * 100) / 100;
    if (paperclipPrice < 0.01) {
        paperclipPrice = 0.01;
    }
    document.getElementById("price").innerHTML = paperclipPrice.toString();
    calculate_interval_selling();
    calculate_price_speed_selling();
}

let buttonInterval;

function holdButton(action) {
    action();
    buttonInterval = setInterval(action, 80);
}

function releaseButton() {
    clearInterval(buttonInterval);
}

// Paperclip selling
function sell_paperclip() {
    if (paperclips < 1) {
        paperclips = 0;
    } else if (quantity > paperclips) {
        quantity = paperclips;
    } 
    else {
        paperclips -= 1 * quantity;
        money = Math.round((money + paperclipPrice * quantity) * 100) / 100;
    }

    calculate_interval_selling();
    calculate_price_speed_selling();

    document.getElementById("money").innerHTML = money.toFixed(2).toString();
    document.getElementById("paperclips").innerHTML = paperclips.toFixed(0).toString();
}

function calculate_interval_selling() {
    interval_selling = paperclipPrice*paperclipPrice * 100 / wordOfMouth;

    if (interval_selling < 4) {
        quantity = 4 / interval_selling;
    } else {
        quantity = 1;
    }

    clearInterval(intervalId);
    intervalId = setInterval(sell_paperclip, interval_selling);
}


function calculate_price_speed_selling() {
    if (paperclips != 0) {
        paperclip_selling = 1000 / interval_selling * quantity;
        income = paperclip_selling * paperclipPrice;
    } else {
        paperclip_selling = 0;
        income = 0;
    }

    document.getElementById("paperclip_selling").innerHTML = paperclip_selling.toFixed(0).toString();
    document.getElementById("income").innerHTML = income.toFixed(2).toString();
}

// Achat d'autoclicker
function buy_autoclicker() {
    if (money >= price_autoclicker) {
        money -= price_autoclicker;
        price_autoclicker = Math.round(price_autoclicker * 1.5 * 100) / 100;

        if (rendement_autoclicker != 0) {
            rendement_autoclicker *= 1.25;
        } else {
            rendement_autoclicker = 1;
        }

        document.getElementById("price_autoclicker").innerHTML = price_autoclicker.toFixed(2).toString();
        document.getElementById("auto-clickers-capacity").innerHTML = rendement_autoclicker.toFixed(0).toString();
    }

}

function buy_wordOfMouth() {
    if (money >= price_wordOfMouth) {
        money -= price_wordOfMouth;
        price_wordOfMouth = Math.round(price_wordOfMouth * 1.5 * 100) / 100;

        wordOfMouth *= 1.25;

        document.getElementById("price_wordOfMouth").innerHTML = price_wordOfMouth.toFixed(2).toString();
        document.getElementById("wordOfMouth_capacity").innerHTML = wordOfMouth.toFixed(0).toString();
    }
    calculate_interval_selling();
    calculate_price_speed_selling();
}

function buy_shops() {
    if (money >= price_shops) {
        money -= price_shops;
        price_shops = Math.round(price_shops * 1.5 * 100) / 100;

        shops *= 1.25;

        document.getElementById("price_shops").innerHTML = price_shops.toFixed(2).toString();
    }
}

function buy_marketing() {
    if (money >= price_marketing) {
        money -= price_marketing;
        price_marketing = Math.round(price_marketing * 1.5 * 100) / 100;
        marketing *= 1.25;
        document.getElementById("price_marketing").innerHTML = price_marketing.toFixed(2).toString();
    }
}

function rendement_autoclicker_func() {
    paperclips += rendement_autoclicker;
    paperclipsTotal += rendement_autoclicker;
    document.getElementById("paperclips_produce").innerHTML = paperclipsTotal.toFixed(0).toString();
}

function verify_money() {
    if (money > 200) {
        document.getElementById("marketing").style.visibility = "visible";
        document.getElementById("price_marketing").style.visibility = "visible";
    }
    if (money > 1500) {
        document.getElementById("shops").style.visibility = "visible";
        document.getElementById("price_shops").style.visibility = "visible";
    }
}

function call_1000() {
    calculate_production();
    calculate_price_speed_selling();
    rendement_autoclicker_func();
    verify_money();
}

// Sauvegarde de la partie
function saveGame() {
    const gameState = {
        paperclips,
        paperclipsTotal,
        paperclipsProduce,
        production,
        paperclipPrice,
        money,
        price_autoclicker,
        rendement_autoclicker,
        wordOfMouth,
        price_wordOfMouth
    };

    localStorage.setItem("paperclipsSave", JSON.stringify(gameState));
}

// Chargement de la partie
function loadGame() {
    const saved = localStorage.getItem("paperclipsSave");
    if (saved) {
        const gameState = JSON.parse(saved);

        paperclips = gameState.paperclips;
        paperclipsTotal = gameState.paperclipsTotal;
        paperclipsProduce = gameState.paperclipsProduce;
        production = gameState.production;
        paperclipPrice = gameState.paperclipPrice;
        money = gameState.money;
        price_autoclicker = gameState.price_autoclicker;
        rendement_autoclicker = gameState.rendement_autoclicker;
        wordOfMouth = gameState.wordOfMouth;
        price_wordOfMouth = gameState.price_wordOfMouth;

        updateUI();
    }
}

// Update UI
function updateUI() {
    document.getElementById("price").innerHTML = paperclipPrice.toFixed(2);
    document.getElementById("money").innerHTML = money.toFixed(2);
    document.getElementById("paperclips_produce").innerHTML = paperclipsTotal.toFixed(0);
    document.getElementById("paperclips").innerHTML = paperclips.toFixed(0);
    document.getElementById("paperclips_production").innerHTML = production.toFixed(0);
    document.getElementById("price_autoclicker").innerHTML = price_autoclicker.toFixed(2);
    document.getElementById("auto-clickers-capacity").innerHTML = rendement_autoclicker.toFixed(0);
    document.getElementById("price_wordOfMouth").innerHTML = price_wordOfMouth.toFixed(2);
    document.getElementById("wordOfMouth_capacity").innerHTML = wordOfMouth.toFixed(0);

    calculate_interval_selling();
    calculate_price_speed_selling();
}

// Reset game
function resetGame() {
    if (confirm("Are you sure you want to restart the game?")) {
        localStorage.removeItem("paperclipsSave");
        location.reload();
    }
}

setInterval(call_1000, 1000);
setInterval(saveGame, 5000);