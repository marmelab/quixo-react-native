const db = require('./index');
const { toEntity } = require('../models/game');

const TABLE_NAME = 'public.game';

const get = id => db.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id]).then(res => toEntity(res.rows[0]));

const save = game => db
  .query({
    text: `INSERT INTO ${TABLE_NAME}(board, rows, cols, current_player) VALUES($1, $2, $3, $4) RETURNING *`,
    values: [JSON.stringify(game.board), game.rows, game.cols, game.currentPlayer],
  })
  .then(res => toEntity(res.rows[0]));

module.exports = { get, save };
