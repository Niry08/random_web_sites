let scrollCountNum = 0

function scrollCall() {
    window.addEventListener("wheel", scrollCount);
}

function scrollCount() {
    scrollCountNum++;
    document.getElementById("score").innerHTML = scrollCountNum;

    document.getElementById("scoreText").style.fontSize = scrollCountNum / 10 + "px";

    scrollCall();
}