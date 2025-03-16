const sites = [
    'scroll_game/scroll_game.html',
    'reflex_game/reflex_game.html',
    'puissance4_game/puissance4_game.html',
    // 'brick_breaker/brick_breaker.html',
];

function getRandomSite() {
    const randomIndex = Math.floor(Math.random() * sites.length);
    window.location.href = sites[randomIndex];
}