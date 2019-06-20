const lodash = require("lodash");

const CROSS_PLAYER = 1;
const NEUTRAL_CUBE = 0;

const getEmptyBoard = (rows, cols) =>
  Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

const newGame = (rows = 5, cols = 5, board = getEmptyBoard(rows, cols)) => ({
  board,
  rows,
  cols,
  currentPlayer: CROSS_PLAYER
});

const getArrayOfCubes = ({ board }) =>
  lodash.flatten(
    board.map((row, x) => row.map((value, y) => ({ x, y, value })))
  );

const isOutsideCube = ({ x, y, size }) =>
  x === 0 || y === 0 || x === size - 1 || y === size - 1;

const cubeBelongsToPlayer = ({ cubeValue, playerTeam }) =>
  cubeValue === NEUTRAL_CUBE || cubeValue === playerTeam;

const getMovablesCubes = ({ board, rows: size, currentPlayer }) =>
  getArrayOfCubes({ board }).filter(
    cube =>
      isOutsideCube({ ...cube, size }) &&
      cubeBelongsToPlayer({
        cubeValue: cube.value,
        playerTeam: currentPlayer
      })
  );

const getAvailablesDestinations = ({ selectedCube, rows: size }) => {
  const destinations = [];
  const { x, y } = selectedCube;
  const isOnStart = index => index === 0;
  const isOnEnd = index => index === size - 1;
  const isOnEdge = index => isOnStart(index) || isOnEnd(index);
  const indexStart = 0;
  const indexEnd = size - 1;
  // If on the top or the bottom of the board, else it's on the left or right
  if (isOnEdge(x)) {
    // If not on the left of the board, we can move it to the left
    if (!isOnStart(y)) {
      destinations.push({ x, y: indexStart });
    }
    // If not on the right of the board, we can move it to the right
    if (!isOnEnd(y)) {
      destinations.push({ x, y: indexEnd });
    }
    // If on the top of the board, we can move it to the bottom, else to the top
    if (isOnStart(x)) {
      destinations.push({ x: indexEnd, y });
    } else {
      destinations.push({ x: indexStart, y });
    }
  } else if (isOnEdge(y)) {
    if (!isOnStart(x)) {
      destinations.push({ x: indexStart, y });
    }
    if (!isOnEnd(x)) {
      destinations.push({ x: indexEnd, y });
    }
    if (isOnStart(y)) {
      destinations.push({ x, y: indexEnd });
    } else {
      destinations.push({ x, y: indexStart });
    }
  }
  return destinations;
};

const moveCube = ({ board, coordsStart, coordsEnd, player }) => {
  const newBoard = copyBoard(board);
  if (coordsStart.x === coordsEnd.x) {
    return shiftLine({
      board: newBoard,
      yStart: coordsStart.y,
      yEnd: coordsEnd.y,
      rowIndex: coordsStart.x,
      player
    });
  }
  if (coordsStart.y === coordsEnd.y) {
    const flippedBoard = flipRowsAndCols(newBoard);
    return flipRowsAndCols(
      shiftLine({
        board: flippedBoard,
        yStart: coordsStart.x,
        yEnd: coordsEnd.x,
        rowIndex: coordsStart.y,
        player
      })
    );
  }
};

const shiftLine = ({ board, yStart, yEnd, rowIndex, player }) => {
  const newBoard = copyBoard(board);
  const [step, indexBound] = yEnd < yStart ? [1, yStart + 1] : [-1, yStart - 1];
  let value = player;
  for (let index = yEnd; index != indexBound; index += step) {
    const tmpValue = newBoard[rowIndex][index];
    newBoard[rowIndex][index] = value;
    value = tmpValue;
  }
  return newBoard;
};

const getNextPlayer = player => player * -1;

const flipRowsAndCols = board =>
  board[0].map((col, i) => board.map(row => row[i]));

const copyBoard = board => board.map(line => line.slice());

module.exports = {
  getEmptyBoard,
  newGame,
  getArrayOfCubes,
  isOutsideCube,
  cubeBelongsToPlayer,
  getMovablesCubes,
  getAvailablesDestinations,
  moveCube,
  shiftLine,
  flipRowsAndCols,
  copyBoard,
  getNextPlayer
};
