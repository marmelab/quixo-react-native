const createNewGame = require("../../app/createNewGame");
const selectCube = require("../../app/selectCube");
const playMove = require("../../app/playMove");
const getMovables = require("../../app/getMovables");
const assignTeam = require("../../app/assignTeam");

describe("A play sequence", () => {
  it("should get movables, select cube and move cube", async () => {
    const game = await createNewGame();
    expect(game.id).not.toBe(undefined);

    const movables = await getMovables(game.id);
    expect(movables).toHaveLength(16);

    const gameWithCubeSelected = await selectCube(game.id, { x: 0, y: 0 });
    expect(gameWithCubeSelected.selectedCube).toEqual({ x: 0, y: 0 });

    const gameWithMovedCube = await playMove(game.id, { x: 4, y: 0 });
    expect(gameWithMovedCube.selectedCube).toEqual(null);
    expect(gameWithMovedCube.board).not.toEqual(game.board);
    expect(gameWithMovedCube.currentPlayer).not.toEqual(game.currentPlayer);
  });
  it("should get movables, select cube, move cube until win the game", async () => {
    const game = await createNewGame("", [
      [1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]);

    expect(game.id).not.toBe(undefined);

    await assignTeam(game.id, "player1");
    await assignTeam(game.id, "player2");

    const movables = await getMovables(game.id);
    expect(movables).toHaveLength(16);

    const gameWithCubeSelected = await selectCube(game.id, { x: 4, y: 4 });
    expect(gameWithCubeSelected.selectedCube).toEqual({ x: 4, y: 4 });

    const gameWithMovedCube = await playMove(game.id, { x: 0, y: 4 });

    const expectedWinner = 1;
    const exepctedWinningLine = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 0, y: 4 }
    ];

    expect(gameWithMovedCube.winner).toEqual(expectedWinner);
    expect(gameWithMovedCube.winningLine).toEqual(exepctedWinningLine);
  });
});
