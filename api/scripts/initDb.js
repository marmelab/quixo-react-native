/* eslint-disable no-console */
const db = require('../database');
const gameTable = require('./db/gameTable');

db.query(gameTable, [])
  .then(() => console.log('Init db OK'))
  .catch(err => console.error(err))
  .finally(() => process.exit());
