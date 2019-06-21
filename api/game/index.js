const flatten = require("lodash/flatten");

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
  flatten(board.map((row, x) => row.map((value, y) => ({ x, y, value }))));

const isOutsideCube = ({ x, y, boardSize }) =>
  x === 0 || y === 0 || x === boardSize - 1 || y === boardSize - 1;

const cubeBelongsToPlayer = ({ cubeValue, playerTeam }) =>
  cubeValue === NEUTRAL_CUBE || cubeValue === playerTeam;

const getMovablesCubes = ({ board, rows: boardSize, currentPlayer }) =>
  getArrayOfCubes({ board }).filter(
    cube =>
      isOutsideCube({ ...cube, boardSize }) &&
      cubeBelongsToPlayer({
        cubeValue: cube.value,
        playerTeam: currentPlayer
      })
  );

const isOnStart = index => index === 0;
const isOnEnd = (index, boardSize) => index === boardSize - 1;
const isOnEdge = (index, boardSize) =>
  isOnStart(index) || isOnEnd(index, boardSize);

const getDestinationsForTopOrBottomCube = ({ x, y, boardSize }) => {
  destinations = [];
  const indexStart = 0;
  const indexEnd = boardSize - 1;
  if (!isOnStart(y)) {
    destinations.push({ x, y: indexStart });
  }
  if (!isOnEnd(y)) {
    destinations.push({ x, y: indexEnd });
  }
  if (isOnStart(x)) {
    destinations.push({ x: indexEnd, y });
  } else {
    destinations.push({ x: indexStart, y });
  }
  return destinations;
};

const getDestinationsForLeftOrRightCube = ({ x, y, boardSize }) => {
  destinations = [];
  const indexStart = 0;
  const indexEnd = boardSize - 1;
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
  return destinations;
};
const getAvailablesDestinations = ({ selectedCube, rows: boardSize }) => {
  const destinations = [];
  const { x, y } = selectedCube;
  if (isOnEdge(x, boardSize)) {
    return getDestinationsForTopOrBottomCube({ x, y, boardSize });
  }
  if (isOnEdge(y, boardSize)) {
    return getDestinationsForLeftOrRightCube({ x, y, boardSize });
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
