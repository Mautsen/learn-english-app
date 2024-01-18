/**
 * Express application for managing word data.
 * @module
 */

/**
 * Import the express module.
 * @const
 * @namespace
 */
const express = require("express");

/**
 * Import the word routes module.
 * @const
 * @namespace
 */
const locationsRouter = require("./routes/words");

/**
 * Import the configuration object for the database connection.
 * @const
 * @namespace
 */
const config = require("./database/config.js");

/**
 * The port on which the server will listen.
 * @constant
 * @type {number}
 */
const port = 8080;

/**
 * Create an instance of the Express application.
 * @constant
 * @type {Object}
 */
const app = express();

/**
 * Enable Cross-Origin Resource Sharing (CORS) to allow anyone to make a fetch API request.
 * @function
 * @name useCors
 * @returns {void}
 */
const cors = require("cors");
app.use(cors());

/**
 * Middleware to parse incoming JSON requests.
 * @function
 * @name useJsonParser
 * @returns {void}
 */
app.use(express.json());

/**
 * Serve static files from the "frontend/dist" folder as is.
 * @function
 * @name useStaticFiles
 * @param {string} path - The path to the static files folder.
 * @returns {void}
 */
app.use(express.static("./frontend/dist"));

/**
 * Use the word routes for handling "/api/words" requests.
 * @function
 * @name useWordRoutes
 * @param {string} path - The base path for the word routes.
 * @param {Object} locationsRouter - The router object for word routes.
 * @returns {void}
 */
app.use("/api/words", locationsRouter);

/**
 * Create an HTTP server and listen on the specified port.
 * @constant
 * @type {Object}
 */
const server = app
  .listen(port, () => {
    console.log(`SERVER: Listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server", err);
    process.exit(1);
  });

/**
 * Gracefully shut down the server and close the MySQL connection when SIGTERM or SIGINT signals are received.
 * @function
 * @name gracefulShutdown
 * @returns {void}
 */
const gracefulShutdown = () => {
  console.log("SERVER: Starting graceful shutdown...");
  // Close the server
  if (server) {
    console.log("Server was opened, so we can close it...");
    server.close((err) => {
      if (err) {
        console.error("SERVER: Error closing server: ", err);
      } else {
        console.log("Server closed");
      }
      console.log("MYSQL: Starting graceful shutdown...");
      config.end((err) => {
        if (err) {
          console.error("MYSQL: Error closing MySql connection: ", err);
        } else {
          console.log("MySql connection closed");
        }
        console.log("MYSQL: shutdown complete");
        process.exit(0); // 0 or without any argument indicates a clean, error-free exit
      });
    });
  }
};

/**
 * Ensures that the database connections are not left open when the application stops running.
 */
process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
// Run with node not nodemon to see all the shutdown messages in console.
