/**
 * Import the MySQL library.
 * @const
 * @namespace
 */
const mysql = require("mysql");

/**
 * Load environment variables from the .env file.
 * @function
 * @name requireDotenvConfig
 */
require("dotenv").config({ path: "./.env" });

/**
 * Represents a MySQL connection pool configuration.
 * @typedef {Object} PoolConfig
 * @property {number} connectionLimit - The maximum number of connections to create at once.
 * @property {string} host - The hostname of the database you are connecting to.
 * @property {string} user - The MySQL user to authenticate as.
 * @property {string} password - The password of that MySQL user.
 * @property {string} database - Name of the database to use for this connection.
 * @property {boolean} multipleStatements - Allow multiple SQL statements in a single query.
 */

/**
 * Create a MySQL connection pool configuration.
 * @type {PoolConfig}
 * @constant
 * @name config
 */
const config = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

/**
 * Exports the MySQL connection pool configuration.
 * @module
 */
module.exports = config;
