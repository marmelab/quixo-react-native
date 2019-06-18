const { getEmptyBoard } = require("../../game");

test("Get an empty board of size 5", () => {
  const board = getEmptyBoard(5, 5);
  expect(board).toHaveLength(5);
  board.forEach(line => expect(line).toHaveLength(5));
});
