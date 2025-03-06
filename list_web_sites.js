const sites = [
    'scroll_game/scroll_game.html',
    'reflex_game/reflex_game.html',
    'morpion_game/morpion_game.html',
];

function getRandomSite() {
    const randomIndex = Math.floor(Math.random() * sites.length);
    window.location.href = sites[randomIndex];
}