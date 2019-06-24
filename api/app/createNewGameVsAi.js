const { newGameVsAi } = require("../game");
const { save, updatePlayer1 } = require("../database/game");
const playAiMove = require("./playAiMove");
const { CROSS_VALUE, CIRCLE_VALUE } = require("../constants/game");

const getRandomTeam = () =>
  Math.floor(Math.random() * Math.floor(2)) === 0 ? CROSS_VALUE : CIRCLE_VALUE;

const createNewGameVsAi = async () => {
  const game = newGameVsAi();
  const newGame = await save(game);
  const iaTeam = getRandomTeam();
  await updatePlayer1(newGame.id, iaTeam);
  if (newGame.currentPlayer === iaTeam) {
    playAiMove(newGame);
  }
  return newGame;
};

module.exports = createNewGameVsAi;
