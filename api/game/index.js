const CROSS_PLAYER = 1;

const getEmptyBoard = (rows, cols) => Array(rows)
  .fill()
  .map(() => Array(cols).fill(0));

const newGame = (rows = 5, cols = 5) => ({
  board: getEmptyBoard(rows, cols),
  rows,
  cols,
  currentPlayer: CROSS_PLAYER,
});

module.exports = { newGame };
