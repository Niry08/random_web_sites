function pressAllButtons() {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((btn) => {
        if (btn.onclick) {
            btn.onclick();
        } else {
            btn.click();
        }
    });
}

// setInterval(pressAllButtons, 100);