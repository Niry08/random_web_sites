// Variables
var paperclips = 0;
var paperclipsTotal = 0;
var paperclipsProduce = 0;

var production = 0;
var paperclipPrice = 0.2;

var interval_selling = 0;
var speed_selling = 0;
var paperclip_selling = 0;

var money = 0;

var price_autoclicker = 1;
var rendement_autoclicker = 0;

var marketing = 1;

let intervalId;

function init() {
    document.getElementById("price").innerHTML = paperclipPrice.toString();
    document.getElementById("money").innerHTML = paperclips.toString();

    calculate_interval_selling();
}

function add_paperclip() {
    paperclips += 1;
    paperclipsTotal += 1;
    document.getElementById("paperclips_produce").innerHTML = paperclipsTotal.toString();
    document.getElementById("paperclips").innerHTML = paperclips.toString();
}

function calculate_production() {
    production = (paperclipsTotal - paperclipsProduce);
    paperclipsProduce = paperclipsTotal;
    document.getElementById("paperclips_production").innerHTML = production.toString();
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
    } else {
        paperclips -= 1;
        money = Math.round((money + paperclipPrice) * 100) / 100;
    }

    document.getElementById("money").innerHTML = money.toString();
    document.getElementById("paperclips").innerHTML = paperclips.toString();
}

function calculate_interval_selling() {
    interval_selling = paperclipPrice * 1000;
    clearInterval(intervalId);
    intervalId = setInterval(sell_paperclip, interval_selling);
}

function calculate_price_speed_selling() {
    if (paperclips != 0) {
        paperclip_selling = 1000 / interval_selling * price_autoclicker * marketing;
    } else {
        paperclip_selling = 0;
    }

    document.getElementById("paperclip_selling").innerHTML = paperclip_selling.toFixed(2);
}

// Achat d'autoclicker
function buy_autoclicker() {
    if (money >= price_autoclicker) {
        money -= price_autoclicker;
        price_autoclicker = Math.round(price_autoclicker * 1.5 * 100) / 100;

        if (rendement_autoclicker != 0) {
            rendement_autoclicker *= 2;
        } else {
            rendement_autoclicker = 1;
        }

        document.getElementById("price_autoclicker").innerHTML = price_autoclicker.toString();
        document.getElementById("auto-clickers-capacity").innerHTML = rendement_autoclicker.toString();
    }

}

function rendement_autoclicker_func() {
    paperclips += rendement_autoclicker;
    paperclipsTotal += rendement_autoclicker;
    document.getElementById("paperclips_produce").innerHTML = paperclipsTotal.toString();
}

function call_1000() {
    calculate_production();
    calculate_price_speed_selling();
    rendement_autoclicker_func();
}

// Pour le calcul de la production
setInterval(call_1000, 1000);