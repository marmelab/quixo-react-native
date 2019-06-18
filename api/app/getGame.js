const { get } = require('../database/game');

const getGame = id => get(id);

module.exports = getGame;
