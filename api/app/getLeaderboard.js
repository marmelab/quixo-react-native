const { getRankedPlayers } = require("../database/player");

const getLeaderboard = () => getRankedPlayers();

module.exports = getLeaderboard;
