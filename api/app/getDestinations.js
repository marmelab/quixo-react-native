const { get } = require("../database/game");
const { getAvailablesDestinations } = require("../game");

const getDestinations = id => get(id).then(getAvailablesDestinations);

module.exports = getDestinations;
