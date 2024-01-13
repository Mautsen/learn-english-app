const config = require("./database/config.js");
const { validateWord, validateId } = require("./validation.js");

console.log();
const connectionFunctions = {
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
};

module.exports = connectionFunctions;
