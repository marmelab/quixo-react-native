const flatten = require("lodash.flatten");
const { CROSS_VALUE, NEUTRAL_VALUE } = require("../constants/game");

const getEmptyBoard = (rows, cols) =>
  Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

const newGame = (rows = 5, cols = 5, board = getEmptyBoard(rows, cols)) => ({
  board,
  rows,
  cols,
  currentPlayer: CROSS_VALUE
});

const newGameVsAi = () => ({ ...newGame(), solo: true });

const getArrayOfCubes = ({ board }) => flatten(getBoardOfCubes(board));

const getBoardOfCubes = board =>
  board.map((row, x) => row.map((value, y) => ({ x, y, value })));

const isOutsideCube = ({ x, y, boardSize }) =>
  x === 0 || y === 0 || x === boardSize - 1 || y === boardSize - 1;

const cubeBelongsToPlayer = ({ cubeValue, playerTeam }) =>
  cubeValue === NEUTRAL_VALUE || cubeValue === playerTeam;

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
  if (!isOnEnd(y, boardSize)) {
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
  if (!isOnEnd(x, boardSize)) {
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
  const { x, y } = selectedCube;
  if (isOnEdge(x, boardSize)) {
    return getDestinationsForTopOrBottomCube({ x, y, boardSize });
  }
  if (isOnEdge(y, boardSize)) {
    return getDestinationsForLeftOrRightCube({ x, y, boardSize });
  }
  return [];
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

const resolveWinnerAndWinningLine = ({ board, currentPlayer }) => {
  const boardWithCoords = getBoardOfCubes(board);
  const winningLines = getWinningsLinesAndColsAndDiags(boardWithCoords);
  let winner = NEUTRAL_VALUE;
  let winCubes = [];
  for (let i = 0; i < winningLines.length; i++) {
    winCubes = winningLines[i];
    winner = winCubes[0].value;

    if (winner !== currentPlayer) {
      break;
    }
  }
  const coordsOfWinCubes = winCubes.map(({ x, y }) => ({ x, y }));

  return { winner, winningLine: coordsOfWinCubes };
};

const getWinningsLinesAndColsAndDiags = board => {
  return [
    ...getWinningCols(board),
    ...getWinningLines(board),
    ...getWinningDiagonals(board)
  ];
};

const getWinningCols = board => {
  const flippedBoard = flipRowsAndCols(board);
  return getWinningLines(flippedBoard);
};

const getWinningLines = board => board.filter(line => isWinningLine(line));

const isWinningLine = line =>
  Math.abs(line.reduce((acc, { value }) => acc + value, 0)) === line.length;

const getWinningDiagonals = board =>
  getDiagonals(board).filter(diag => isWinningLine(diag));

const getDiagonals = board => {
  const firstDiag = [];
  const secondDiag = [];
  for (let i = 0; i < board.length; i++) {
    const secondDiagIndex = board.length - 1 - i;
    firstDiag.push(board[i][i]);
    secondDiag.push(board[i][secondDiagIndex]);
  }
  return [firstDiag, secondDiag];
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
  getNextPlayer,
  resolveWinnerAndWinningLine,
  newGameVsAi
};
