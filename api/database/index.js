const { Pool } = require('pg');
const {
  URL, PORT, USER, PASSWORD, DB,
} = require('../constants/database');

const pool = new Pool({
  user: USER,
  host: URL,
  database: DB,
  password: PASSWORD,
  port: PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
