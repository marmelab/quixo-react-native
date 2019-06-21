const { newGameVsAi } = require("../game");
const { save } = require("../database/game");

const createNewGameVsAi = () => {
  const game = newGameVsAi();
  return save(game);
};

module.exports = createNewGameVsAi;
