const fetch = require("node-fetch");
const selectCube = require("./selectCube");
const moveCubeAndResolveWinner = require("./moveCubeAndResolveWinner");
const { ADVISOR_HOST } = require("../constants/advisor");

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const getCoordsFromBody = ({ CoordsStart, CoordsEnd }) => ({
  coordsStart: { x: CoordsStart.X, y: CoordsStart.Y },
  coordsEnd: { x: CoordsEnd.X, y: CoordsEnd.Y }
});

const fetchBestMove = ({ board, currentPlayer }) =>
  fetch(`${ADVISOR_HOST}/best-move`, {
    method: "post",
    body: JSON.stringify({
      Grid: board,
      Player: currentPlayer,
      SelectedCube: {
        Coords: { x: -1, y: -1 },
        Value: -1
      }
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(body => getCoordsFromBody(body));

const playAiMove = async game => {
  await wait(1);
  const { coordsStart, coordsEnd } = await fetchBestMove(game);
  const gameWithSelectedCube = await selectCube(game.id, coordsStart);
  await wait(2);
  return await moveCubeAndResolveWinner(gameWithSelectedCube, coordsEnd);
};

module.exports = playAiMove;
