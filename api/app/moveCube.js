const { get, updateBoardAndPlayer } = require("../database/game");
const { moveCube, getNextPlayer } = require("../game");

const moveCubeAndUpdateGame = async (id, destination) => {
  const game = await get(id);
  const newBoard = moveCube({
    board: game.board,
    coordsStart: game.selectedCube,
    coordsEnd: destination,
    player: game.currentPlayer
  });
  return updateBoardAndPlayer(
    game.id,
    newBoard,
    getNextPlayer(game.currentPlayer)
  );
};

module.exports = moveCubeAndUpdateGame;
