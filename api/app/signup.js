const { save } = require("../database/player");

const singup = pseudo => save(pseudo);

module.exports = singup;
