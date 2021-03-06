const { get } = require("../database/game");
const playAiMove = require("./playAiMove");
const moveCubeAndResolveWinner = require("./moveCubeAndResolveWinner");

const moveCubeAndUpdateGame = async (id, destination) => {
  const game = await get(id);
  const newGame = await moveCubeAndResolveWinner(game, destination);
  if (newGame.solo && newGame.currentPlayer === newGame.player1.team) {
    playAiMove(newGame);
  }
  return newGame;
};

module.exports = moveCubeAndUpdateGame;
