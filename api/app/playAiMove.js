const fetch = require("node-fetch");
const selectCube = require("./selectCube");
const moveCubeAndResolveWinner = require("./moveCubeAndResolveWinner");

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const getCoordsFromBody = ({ CoordsStart, CoordsEnd }) => ({
  coordsStart: { x: CoordsStart.X, y: CoordsStart.Y },
  coordsEnd: { x: CoordsEnd.X, y: CoordsEnd.Y }
});

const fetchBestMove = ({ board, currentPlayer }) =>
  fetch("http://advisor:8001/best-move", {
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
  const advice = await fetchBestMove(game);
  const selectedCube = advice.coordsStart;
  const gameWithSelectedCube = await selectCube(game.id, selectedCube);
  await wait(1);
  return await moveCubeAndResolveWinner(gameWithSelectedCube, advice.coordsEnd);
};

module.exports = playAiMove;
