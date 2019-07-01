const { get, updatePlayer1, updatePlayer2 } = require("../database/game");
const { incrementGame } = require("../database/player");
const {
  CROSS_VALUE,
  CIRCLE_VALUE,
  NEUTRAL_VALUE
} = require("../constants/game");

const getRandomTeam = () =>
  Math.floor(Math.random() * Math.floor(2)) === 0 ? CROSS_VALUE : CIRCLE_VALUE;
const getOpponentTeam = team =>
  team === CROSS_VALUE ? CIRCLE_VALUE : CROSS_VALUE;

const assignTeam = async (id, pseudo = "anonymous") => {
  const game = await get(id);
  await incrementGame(pseudo);
  if (!game.player1) {
    const playerTeam = getRandomTeam();
    return await updatePlayer1(id, { pseudo, team: playerTeam });
  }
  if (!game.player2) {
    const playerTeam = getOpponentTeam(game.player1.team);
    return await updatePlayer2(id, { pseudo, team: playerTeam });
  }
  return { team: NEUTRAL_VALUE };
};

module.exports = assignTeam;
