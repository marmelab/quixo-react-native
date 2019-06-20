const { updateSelectedCube } = require("../database/game");

const selectCube = (id, selectedCube) => updateSelectedCube(id, selectedCube);

module.exports = selectCube;
