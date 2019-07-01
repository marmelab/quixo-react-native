const db = require("./index");

const TABLE_NAME = "public.player";

const get = pseudo =>
  db
    .query(`SELECT * FROM ${TABLE_NAME} WHERE pseudo = $1`, [pseudo])
    .then(res => res.rows[0]);

const save = pseudo =>
  db
    .query(`INSERT INTO ${TABLE_NAME}(pseudo) VALUES($1) RETURNING *`, [pseudo])
    .then(res => res.rows[0]);

const incrementWin = pseudo =>
  db.query(`UPDATE ${TABLE_NAME} SET won = won + 1 WHERE pseudo = $1`, [
    pseudo
  ]);

const incrementGame = pseudo =>
  db.query(`UPDATE ${TABLE_NAME} SET played = played + 1 WHERE pseudo = $1`, [
    pseudo
  ]);

const getRankedPlayers = () =>
  db.query(`SELECT * FROM ${TABLE_NAME} ORDER BY won`).then(res => res.rows);

module.exports = {
  get,
  save,
  incrementWin,
  incrementGame,
  getRankedPlayers
};
