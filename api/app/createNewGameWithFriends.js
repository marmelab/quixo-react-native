const { newGame } = require("../game");
const { saveWithPlayers } = require("../database/game");
const { incrementGame } = require("../database/player");
const { CROSS_VALUE, CIRCLE_VALUE } = require("../constants/game");

const getRandomTeam = () =>
  Math.floor(Math.random() * Math.floor(2)) === 0 ? CROSS_VALUE : CIRCLE_VALUE;
const getOpponentTeam = team =>
  team === CROSS_VALUE ? CIRCLE_VALUE : CROSS_VALUE;

const createNewGameWithFriends = async (pseudo1, pseudo2, board = null) => {
  const game =
    board === null ? newGame() : newGame(board.length, board.length, board);

  const player1 = { pseudo: pseudo1, team: getRandomTeam() };
  const player2 = { pseudo: pseudo2, team: getOpponentTeam(player1.team) };
  const savedGame = await saveWithPlayers(game, player1, player2);
  await incrementGame(pseudo1);
  await incrementGame(pseudo2);
  return savedGame;
};

module.exports = createNewGameWithFriends;
