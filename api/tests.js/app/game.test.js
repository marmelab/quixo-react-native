const createNewGame = require("../../app/createNewGame");
const selectCube = require("../../app/selectCube");
const moveCube = require("../../app/moveCube");
const getMovables = require("../../app/getMovables");

test("A sequence of playing", async () => {
  const game = await createNewGame();
  expect(game.id).not.toBe(undefined);
  const movables = await getMovables(game.id);
  expect(movables).toHaveLength(16);
  const gameWithCubeSelected = await selectCube(game.id, { x: 0, y: 0 });
  expect(gameWithCubeSelected.selectedCube).toEqual({ x: 0, y: 0 });
  const gameWithMovedCube = await moveCube(game.id, { x: 4, y: 0 });
  expect(gameWithMovedCube.selectedCube).toEqual(null);
  expect(gameWithMovedCube.board).not.toEqual(game.board);
  expect(gameWithMovedCube.currentPlayer).not.toEqual(game.currentPlayer);
});
