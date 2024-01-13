// Import the MySQL library
const mysql = require("mysql");

// Load environment variables from .env file
require("dotenv").config({ path: "./.env" });

// Create a MySQL connection object
const config = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true, // Enable multiple SQL statements, you should avoid this.
});

module.exports = config;
