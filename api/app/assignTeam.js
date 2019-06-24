const { get, updatePlayer1, updatePlayer2 } = require("../database/game");
const {
  CROSS_VALUE,
  CIRCLE_VALUE,
  NEUTRAL_VALUE
} = require("../constants/game");

const getRandomTeam = () =>
  Math.floor(Math.random() * Math.floor(2)) === 0 ? CROSS_VALUE : CIRCLE_VALUE;
const getOpponentTeam = team =>
  team === CROSS_VALUE ? CIRCLE_VALUE : CROSS_VALUE;

const assignTeam = async id => {
  const game = await get(id);
  if (!game.player1) {
    const playerTeam = getRandomTeam();
    const team = await updatePlayer1(id, playerTeam);
    return { team };
  }
  if (!game.player2) {
    const playerTeam = getOpponentTeam(game.player1);
    const team = await updatePlayer2(id, playerTeam);
    return { team };
  }
  return { team: NEUTRAL_VALUE };
};

module.exports = assignTeam;
