const {createPool} = require('mysql2/promise');
const config = require('../config');

const pool = createPool(
  config.db
)

module.exports = {
  pool
}
