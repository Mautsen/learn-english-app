// Import the express module
const express = require("express");
const database = require("../crudrepository");
const { check, validationResult } = require("express-validator"); // Use this to validate POST requests. Use "npm install express-validator" to use it. I chose this one because the errors are very clear and shows where exactly did it happen. You could also use schema (like last week).
const wordsRouter = express.Router();

// Define the validation middleware for POST requests
const validateWordData = [
  check("english")
    .matches(/^[a-zA-Z]+$/, "i")
    .withMessage("Invalid value for English, must contain only letters"),
  check("finnish")
    .matches(/^[a-zA-ZäåöÄÅÖ]+$/)
    .withMessage("Invalid value for Finnish, must contain only letters"),
];

wordsRouter.get("/", async (req, res) => {
  const words = await database.findAll();
  res.json(words);
});

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

// Update word
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

module.exports = wordsRouter;
