const { getCurrentGames } = require("../database/game");

const getCurrentGamesForPlayer = pseudo => getCurrentGames(pseudo);

module.exports = getCurrentGamesForPlayer;
