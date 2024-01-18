/**
 * Module for handling database connections and CRUD operations for words.
 * @module
 */

/**
 * Configuration object for the database connection.
 * @const
 * @namespace
 */
const config = require("./database/config.js");

/**
 * Module for word data validation.
 * @const
 * @namespace
 */
const { validateWord, validateId } = require("./validation.js");

/**
 * Module for database connection functions.
 * @const
 * @namespace
 * @type {Object}
 * @property {Function} connect - Establishes a connection to the database.
 * @property {Function} close - Closes the connection to the database.
 * @property {Function} save - Saves a new word to the database.
 * @property {Function} findAll - Retrieves all words from the database.
 * @property {Function} deleteById - Deletes a word from the database by ID.
 * @property {Function} findById - Retrieves a word from the database by ID.
 * @property {Function} updateById - Updates a word in the database by ID.
 */
const connectionFunctions = {
  /**
   * Establishes a connection to the database.
   * @function
   * @name connect
   * @returns {Promise} Resolves if the connection is successful, rejects with an error otherwise.
   */
  connect: () => {
    return new Promise((resolve, reject) => {
      config.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  /**
   * Closes the connection to the database.
   * @function
   * @name close
   * @returns {Promise} Resolves if the closing is successful, rejects with an error otherwise.
   */
  close: () => {
    return new Promise((resolve, reject) => {
      config.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Closed"); // Resolve with no value
        }
      });
    });
  },

  /**
   * Saves a new word to the database.
   * @function
   * @name save
   * @param {Object} word - The word object to be saved to the database.
   * @returns {Promise} Resolves if the save is successful, rejects with an error otherwise.
   */
  save: (word) => {
    return new Promise((resolve, reject) => {
      const validationErrors = validateWord(word);
      if (validationErrors) {
        reject("Validation error: " + validationErrors);
        return;
      }
      const query = "INSERT INTO words (english, finnish) VALUES (?, ?)";
      const values = [word.english, word.finnish];

      config.query(query, values, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  /**
   * Retrieves all words from the database.
   * @function
   * @name findAll
   * @returns {Promise} Resolves with an array of words if successful, rejects with an error otherwise.
   */
  findAll: () => {
    return new Promise((resolve, reject) => {
      config.query("SELECT * FROM words", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  /**
   * Deletes a word from the database by ID.
   * @function
   * @name deleteById
   * @param {number} id - The ID of the word to be deleted.
   * @returns {Promise} Resolves if the deletion is successful, rejects with an error otherwise.
   */
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const validationErrors = validateId(id);
      if (validationErrors) {
        reject("Validation error: " + validationErrors);
        return;
      }
      const query = "DELETE FROM words WHERE id = ?";
      const values = [id];

      config.query(query, values, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  /**
   * Retrieves a word from the database by ID.
   * @function
   * @name findById
   * @param {number} id - The ID of the word to be retrieved.
   * @returns {Promise} Resolves with the word object if successful, rejects with an error otherwise.
   */
  findById: (id) => {
    return new Promise((resolve, reject) => {
      const validationErrors = validateId(id);
      if (validationErrors) {
        reject("Validation error: " + validationErrors);
        return;
      }
      const query = "SELECT * FROM words WHERE id = ?";
      const values = [id];

      config.query(query, values, (err, words) => {
        if (err) {
          reject(err);
        } else {
          const word = words[0];
          if (!word) {
            reject({ status: 404, message: "Can't find word" });
          } else {
            const result = {
              id: word.id,
              english: word.english,
              finnish: word.finnish,
            };
            resolve(result);
          }
        }
      });
    });
  },

  /**
   * Updates a word in the database by ID.
   * @function
   * @name updateById
   * @param {number} id - The ID of the word to be updated.
   * @param {Object} updatedWord - The updated word object.
   * @returns {Promise} Resolves with the updated word object if successful, rejects with an error otherwise.
   */
  updateById: (id, updatedWord) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE words SET english=?, finnish=? WHERE id=?";
      const values = [updatedWord.english, updatedWord.finnish, id];

      config.query(query, values, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(updatedWord);
        }
      });
    });
  },
};

/**
 * Exports the connectionFunctions for use in other modules.
 */
module.exports = connectionFunctions;
