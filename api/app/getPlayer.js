const { get } = require("../database/player");

const getPlayer = pseudo => get(pseudo);

module.exports = getPlayer;
