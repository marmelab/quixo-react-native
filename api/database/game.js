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
      text: `INSERT INTO ${TABLE_NAME}(board, rows, cols, current_player, solo) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      values: [
        JSON.stringify(game.board),
        game.rows,
        game.cols,
        game.currentPlayer,
        game.solo
      ]
    })
    .then(res => toEntity(res.rows[0]));

const saveWithPlayers = (game, player1, player2) =>
  db
    .query({
      text: `INSERT INTO ${TABLE_NAME}(board, rows, cols, current_player, solo, player1, player2) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      values: [
        JSON.stringify(game.board),
        game.rows,
        game.cols,
        game.currentPlayer,
        game.solo,
        JSON.stringify(player1),
        JSON.stringify(player2)
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

const updatePlayer1 = (id, player) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET player1 = $1 WHERE id = $2 RETURNING player1`,
      values: [JSON.stringify(player), id]
    })
    .then(res => res.rows[0].player1);

const updatePlayer2 = (id, player) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET player2 = $1 WHERE id = $2 RETURNING player2`,
      values: [JSON.stringify(player), id]
    })
    .then(res => res.rows[0].player2);

const updateBoardAndWinner = (id, board, winner, winningLine) =>
  db
    .query({
      text: `UPDATE ${TABLE_NAME} SET board = $1, winner = $2, winning_line = $3, selected_cube = null WHERE id = $4 RETURNING *`,
      values: [JSON.stringify(board), winner, JSON.stringify(winningLine), id]
    })
    .then(res => toEntity(res.rows[0]));

const getCurrentGames = pseudo =>
  db
    .query(
      `SELECT * FROM ${TABLE_NAME} WHERE winner IS NULL and (player1 ->> 'pseudo' = $1 or player2 ->> 'pseudo' = $1)`,
      [pseudo]
    )
    .then(res => res.rows.map(game => toEntity(game)));

module.exports = {
  get,
  save,
  updateSelectedCube,
  updateBoardAndPlayer,
  updatePlayer1,
  updatePlayer2,
  updateBoardAndWinner,
  getCurrentGames,
  saveWithPlayers
};
