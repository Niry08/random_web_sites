// Variables
var paperclips = 0;
var paperclipsTotal = 0;
var paperclipsProduce = 0;

var production = 0;
var paperclipPrice = 0.2;

var interval_selling = 0;
var speed_selling = 0;
var paperclip_selling = 0;
var income = 0;
var quantity = 1;

var money = 0;

var price_autoclicker = 1;
var rendement_autoclicker = 0;

var marketing = 1;
var price_marketing = 5;

let intervalId;

function init() {
    document.getElementById("price").innerHTML = paperclipPrice.toString();
    document.getElementById("money").innerHTML = money.toString();

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
    interval_selling = paperclipPrice * 100 / marketing; // Attention 5000 est non 1000 (pour flexibiliser la vitesse de vente)

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
            rendement_autoclicker *= 2;
        } else {
            rendement_autoclicker = 1;
        }

        document.getElementById("price_autoclicker").innerHTML = price_autoclicker.toFixed(2).toString();
        document.getElementById("auto-clickers-capacity").innerHTML = rendement_autoclicker.toFixed(0).toString();
    }

}

function buy_marketing() {
    if (money >= price_marketing) {
        money -= price_marketing;
        price_marketing = Math.round(price_marketing * 1.5 * 100) / 100;

        marketing *= 2;

        document.getElementById("price_marketing").innerHTML = price_marketing.toFixed(2).toString();
        document.getElementById("marketing_capacity").innerHTML = marketing.toFixed(0).toString();
    }
    calculate_interval_selling();
    calculate_price_speed_selling();
}

function rendement_autoclicker_func() {
    paperclips += rendement_autoclicker;
    paperclipsTotal += rendement_autoclicker;
    document.getElementById("paperclips_produce").innerHTML = paperclipsTotal.toFixed(0).toString();
}

function call_1000() {
    calculate_production();
    calculate_price_speed_selling();
    rendement_autoclicker_func();
}

setInterval(call_1000, 1000);