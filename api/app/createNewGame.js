const { newGame } = require("../game");
const { save } = require("../database/game");
const { incrementGame } = require("../database/player");

const createNewGame = async (pseudo = "anonymous", board = null) => {
  const game =
    board === null ? newGame() : newGame(board.length, board.length, board);

  await incrementGame(pseudo);
  return save(game);
};

module.exports = createNewGame;
