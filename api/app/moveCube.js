const {
  get,
  updateBoardAndPlayer,
  updateBoardAndWinner
} = require("../database/game");
const {
  moveCube,
  getNextPlayer,
  resolveWinnerAndWinningLine
} = require("../game");
const { NEUTRAL_VALUE } = require("../constants/game");

const moveCubeAndUpdateGame = async (id, destination) => {
  const game = await get(id);
  const newBoard = moveCube({
    board: game.board,
    coordsStart: game.selectedCube,
    coordsEnd: destination,
    player: game.currentPlayer
  });
  const { winner, winningLine } = resolveWinnerAndWinningLine({
    board: newBoard,
    currentPlayer: game.currentPlayer
  });
  if (winner !== NEUTRAL_VALUE && winningLine.length > 0) {
    return updateBoardAndWinner(game.id, newBoard, winner, winningLine);
  }
  return updateBoardAndPlayer(
    game.id,
    newBoard,
    getNextPlayer(game.currentPlayer)
  );
};

module.exports = moveCubeAndUpdateGame;
