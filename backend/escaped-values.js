const config = require("./database/config.js");
function escapeValues(values) {
  if (typeof values !== "string" || isNaN(values)) {
    throw new Error("Invalid input. Please enter a valid string value.");
  }
  return config.escape(values);
}

module.exports = escapeValues;
