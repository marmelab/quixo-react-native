const toDatabase = game => Object.keys(game).reduce((newGame, key) => {
  let newKey = key;
  let val = game[key];
  if (key === 'currentPlayer') {
    newKey = 'current_player';
  }
  if (key === 'selectedCube') {
    newKey = 'selected_cube';
  }
  if (key === 'board') {
    val = JSON.stringify(game[key]);
  }
  return Object.assign({}, newGame, { [newKey]: val });
}, {});

const toEntity = game => Object.keys(game).reduce((newGame, key) => {
  let newKey = key;
  if (key === 'current_player') {
    newKey = 'currentPlayer';
  }
  if (key === 'selected_cube') {
    newKey = 'selectedCube';
  }
  return Object.assign({}, newGame, { [newKey]: game[key] });
}, {});

module.exports = {
  toDatabase,
  toEntity,
};
