/**
 * Express module for handling word-related routes.
 * @const
 * @namespace
 */
const express = require("express");

/**
 * Database module for CRUD operations on words.
 * @const
 * @namespace
 */
const database = require("../crudrepository");

/**
 * Express-validator module for request data validation.
 * @const
 * @namespace
 */
const { check, validationResult } = require("express-validator");

/**
 * Router for handling word-related routes.
 * @const
 * @namespace
 */
const wordsRouter = express.Router();

/**
 * Middleware for validating data in POST requests.
 * @constant
 * @type {Array}
 * @name validateWordData
 */
const validateWordData = [
  check("english")
    .matches(/^[a-zA-Z]+$/, "i")
    .withMessage("Invalid value for English, must contain only letters"),
  check("finnish")
    .matches(/^[a-zA-ZäåöÄÅÖ]+$/)
    .withMessage("Invalid value for Finnish, must contain only letters"),
];

/**
 * GET endpoint to retrieve all words.
 * @function
 * @name getAllWords
 */
wordsRouter.get("/", async (req, res) => {
  const words = await database.findAll();
  res.json(words);
});

/**
 * GET endpoint to retrieve a word by ID.
 * @function
 * @name getWordById
 */
wordsRouter.get("/:myId([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.myId);
    const word = await database.findById(id);

    if (!word) {
      res.status(404).send("Can't find word");
    } else {
      res.status(200).json(word);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * DELETE endpoint to delete a word by ID.
 * @function
 * @name deleteWordById
 */
wordsRouter.delete("/:myId([0-9]+)", async (req, res) => {
  try {
    const id = parseInt(req.params.myId);
    const deletedWord = await database.deleteById(id);

    if (!deletedWord) {
      res.status(404).send("Can't find word");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * POST endpoint to add a new word.
 * @function
 * @name addNewWord
 */
wordsRouter.post("/", validateWordData, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation succeeds, process the request data and save it to the database
    const { english, finnish } = req.body;

    // Call the save function from your database module to save the word
    const word = await database.save({ english, finnish });

    res.status(201).json(word);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * PUT endpoint to update a word by ID.
 * @function
 * @name updateWordById
 */
wordsRouter.put("/:myId([0-9]+)", validateWordData, async (req, res) => {
  try {
    // Check for validation errors
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const id = parseInt(req.params.myId);
    const { english, finnish } = req.body;

    const word = await database.updateById(id, {
      english,
      finnish,
    });

    if (!word) {
      console.log(word);
      res.status(404).send("Can't find word");
    } else {
      res.status(200).json(word);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Exports the wordsRouter for use in other modules.
 * @module
 */
module.exports = wordsRouter;
