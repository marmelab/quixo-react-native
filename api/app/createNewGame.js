const { newGame } = require("../game");
const { save } = require("../database/game");

const createNewGame = (board = null) => {
  const game =
    board === null ? newGame() : newGame(board.length, board.length, board);
  return save(game);
};

module.exports = createNewGame;
