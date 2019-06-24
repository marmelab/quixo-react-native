const db = require("./index");
const { toEntity } = require("../models/game");

const TABLE_NAME = "public.game";

const get = id =>
  db
    .query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id])
    .then(res => toEntity(res.rows[0]));

const save = game =>
  db
    .query({
      text: `INSERT INTO ${TABLE_NAME}(board, rows, cols, current_player) VALUES($1, $2, $3, $4) RETURNING *`,
      values: [
        JSON.stringify(game.board),
        game.rows,
        game.cols,
        game.currentPlayer
      ]
    })
    .then(res => toEntity(res.rows[0]));

const updateSelectedCube = (id, selectedCube) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET selected_cube = $1 WHERE id = $2 RETURNING *`,
      values: [JSON.stringify(selectedCube), id]
    })
    .then(res => toEntity(res.rows[0]));

const updateBoardAndPlayer = (id, board, player) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET board = $1, current_player = $2, selected_cube = null WHERE id = $3 RETURNING *`,
      values: [JSON.stringify(board), player, id]
    })
    .then(res => toEntity(res.rows[0]));

const updatePlayer1 = (id, team) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET player1 = $1 WHERE id = $2 RETURNING player1`,
      values: [team, id]
    })
    .then(res => res.rows[0].player1);

const updatePlayer2 = (id, team) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET player2 = $1 WHERE id = $2 RETURNING player2`,
      values: [team, id]
    })
    .then(res => res.rows[0].player2);

const updateBoardAndWinner = (id, board, winner, winningLine) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET board = $1, winner = $2, winning_line = $3, selected_cube = null WHERE id = $4 RETURNING *`,
      values: [JSON.stringify(board), winner, JSON.stringify(winningLine), id]
    })
    .then(res => toEntity(res.rows[0]));

module.exports = {
  get,
  save,
  updateSelectedCube,
  updateBoardAndPlayer,
  updatePlayer1,
  updatePlayer2,
  updateBoardAndWinner
};
