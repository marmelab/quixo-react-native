const {
  getEmptyBoard,
  newGame,
  getMovablesCubes,
  getAvailablesDestinations,
  moveCube
} = require("../../game");

describe("Game functions", () => {
  describe("getEmptyBoard", () => {
    it("should return an empty board of size 5", () => {
      const board = getEmptyBoard(5, 5);
      expect(board).toHaveLength(5);
      board.forEach(line => expect(line).toHaveLength(5));
    });
  });

  describe("getMovables", () => {
    it("should return all movables at the start of the game", () => {
      const game = newGame();
      const expectedMovables = [
        { x: 0, y: 0, value: 0 },
        { x: 0, y: 1, value: 0 },
        { x: 0, y: 2, value: 0 },
        { x: 0, y: 3, value: 0 },
        { x: 0, y: 4, value: 0 },
        { x: 1, y: 0, value: 0 },
        { x: 1, y: 4, value: 0 },
        { x: 2, y: 0, value: 0 },
        { x: 2, y: 4, value: 0 },
        { x: 3, y: 0, value: 0 },
        { x: 3, y: 4, value: 0 },
        { x: 4, y: 0, value: 0 },
        { x: 4, y: 1, value: 0 },
        { x: 4, y: 2, value: 0 },
        { x: 4, y: 3, value: 0 },
        { x: 4, y: 4, value: 0 }
      ];
      const movables = getMovablesCubes(game);
      expect(movables).toEqual(expectedMovables);
    });

    it("should return one movable cube", () => {
      const game = newGame(5, 5, [
        [1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1]
      ]);

      const expectedMovables = [{ x: 0, y: 0, value: 1 }];

      const movables = getMovablesCubes(game);
      expect(movables).toEqual(expectedMovables);
    });
  });
  describe("getDestinations", () => {
    it("should return 2 destinations from corner", () => {
      const game = newGame();
      const selectedCube = { x: 0, y: 0 };

      const exepectedDestinations = [{ x: 0, y: 4 }, { x: 4, y: 0 }];

      const destinations = getAvailablesDestinations({ ...game, selectedCube });
      expect(destinations).toEqual(exepectedDestinations);
    });
  });

  describe("moveCube", () => {
    it("should move cube from column middle with shift on row", () => {
      const game = newGame(5, 5, [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
      const coordsStart = { x: 2, y: 0 };
      const coordsEnd = { x: 2, y: 4 };

      const expectedBoard = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      const board = moveCube({
        board: game.board,
        coordsStart,
        coordsEnd,
        player: game.currentPlayer
      });

      expect(board).toEqual(expectedBoard);
    });

    it("should move cube from row middle with shift on column", () => {
      const game = newGame(5, 5, [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
      const coordsStart = { x: 0, y: 2 };
      const coordsEnd = { x: 4, y: 2 };

      const expectedBoard = [
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0]
      ];
      const board = moveCube({
        board: game.board,
        coordsStart,
        coordsEnd,
        player: game.currentPlayer
      });

      expect(board).toEqual(expectedBoard);
    });
  });
});
