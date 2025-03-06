let scrollCountNum = 0

function scrollCall() {
    window.addEventListener("wheel", scrollCount);
}

function scrollCount() {
    scrollCountNum++;
    document.getElementById("score").innerHTML = scrollCountNum;
    scrollCall();
}