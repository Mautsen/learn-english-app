/**
 * Module for escaping string values using the MySQL escape function.
 * @module
 */

/**
 * Configuration object for the database connection.
 * @const
 * @namespace
 */
const config = require("./database/config.js");

/**
 * Function for escaping string values using the MySQL escape function.
 * @function
 * @name escapeValues
 * @param {string} values - The string value to be escaped.
 * @throws {Error} Throws an error if the input is not a valid string.
 * @returns {string} The escaped string value.
 */
function escapeValues(values) {
  if (typeof values !== "string" || isNaN(values)) {
    throw new Error("Invalid input. Please enter a valid string value.");
  }
  return config.escape(values);
}

/**
 * Exports the escapeValues function for use in other modules.
 */
module.exports = escapeValues;
