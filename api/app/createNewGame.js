const { newGame } = require('../game');
const { save } = require('../database/game');

const createNewGame = () => {
  const game = newGame();
  return save(game);
};

module.exports = createNewGame;
