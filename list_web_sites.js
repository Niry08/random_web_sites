const sites = [
    'scroll_game/scroll_game.html',
    'reflex_game/reflex_game.html',
    'brick_breaker/brick_breaker.html',
    'memory_game/memory_game.html',
    'paperclips_game/paperclips_game.html',
    // 'collection_game/collection_game.html',
];

function getRandomSite() {
    const randomIndex = Math.floor(Math.random() * sites.length);
    window.location.href = sites[randomIndex];
}