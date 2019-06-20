const { get } = require("../database/game");
const { getMovablesCubes } = require("../game");

const getMovables = id => get(id).then(getMovablesCubes);

module.exports = getMovables;
