const Validator = require("jsonschema").Validator;
const validator = new Validator();
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
const idSchema = {
  type: "number",
  minimum: 1,
};

const validateWord = (wordData) => {
  // Validate location data against the schema
  const validation = validator.validate(wordData, locSchema);
  if (validation.errors.length > 0) {
    console.log("Validation errors:", validation.errors);
    return validation.errors;
  }
  return null;
};

const validateId = (id) => {
  // Validate word data against the schema
  const validation = validator.validate(id, idSchema);

  if (validation.errors.length > 0) {
    return validation.errors;
  }
  return null;
};
module.exports = {
  validateWord,
  validateId,
};
