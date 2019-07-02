const {
  updateBoardAndPlayer,
  updateBoardAndWinner
} = require("../database/game");
const { incrementWin } = require("../database/player");
const {
  moveCube,
  getNextPlayer,
  resolveWinnerAndWinningLine
} = require("../game");
const { NEUTRAL_VALUE } = require("../constants/game");

const moveCubeAndUpdateGame = async (game, destination) => {
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
    const { pseudo } =
      winner === game.player1.team ? game.player1 : game.player2;
    await incrementWin(pseudo);
    return updateBoardAndWinner(game.id, newBoard, winner, winningLine);
  }
  return updateBoardAndPlayer(
    game.id,
    newBoard,
    getNextPlayer(game.currentPlayer)
  );
};

module.exports = moveCubeAndUpdateGame;
