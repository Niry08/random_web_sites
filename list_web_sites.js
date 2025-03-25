const sites = [
    'scroll_game/scroll_game.html',
    'reflex_game/reflex_game.html',
    'puissance4_game/puissance4_game.html',
    'brick_breaker/brick_breaker.html',
    // 'collection_game/collection_game.html',
    'memory_game/memory_game.html',
];

function getRandomSite() {
    const randomIndex = Math.floor(Math.random() * sites.length);
    window.location.href = sites[randomIndex];
}