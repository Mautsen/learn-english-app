/**
 * Module for validating word data and IDs.
 * @module
 */

/**
 * Import the Validator class from the "jsonschema" module.
 * @const
 * @namespace
 */
const Validator = require("jsonschema").Validator;

/**
 * Create a new instance of the Validator class.
 * @const
 * @type {Object}
 */
const validator = new Validator();

/**
 * The schema for validating word data.
 * @constant
 * @type {Object}
 */
const locSchema = {
  type: "object",
  properties: {
    english: {
      type: "string",
      pattern: "^[a-zA-Z]+$", // Only letters allowed
    },
    finnish: {
      type: "string",
      pattern: "^[a-zA-ZäåöÄÅÖ]+$",
    },
  },
  required: ["english", "finnish"],
};

/**
 * The schema for validating word IDs.
 * @constant
 * @type {Object}
 */
const idSchema = {
  type: "number",
  minimum: 1,
};

/**
 * Validate word data against the specified schema.
 * @function
 * @name validateWord
 * @param {Object} wordData - The word data to be validated.
 * @returns {(string[]|null)} - An array of validation errors or null if validation is successful.
 */
const validateWord = (wordData) => {
  // Validate word data against the schema
  const validation = validator.validate(wordData, locSchema);
  if (validation.errors.length > 0) {
    console.log("Validation errors:", validation.errors);
    return validation.errors;
  }
  return null;
};

/**
 * Validate a word ID against the specified schema.
 * @function
 * @name validateId
 * @param {number} id - The word ID to be validated.
 * @returns {(string[]|null)} - An array of validation errors or null if validation is successful.
 */
const validateId = (id) => {
  // Validate word data against the schema
  const validation = validator.validate(id, idSchema);

  if (validation.errors.length > 0) {
    return validation.errors;
  }
  return null;
};

/**
 * Exports the validation functions for use in other modules.
 */
module.exports = {
  validateWord,
  validateId,
};
