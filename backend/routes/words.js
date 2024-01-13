// Import the express module
const express = require("express");
const database = require("../crudrepository");
const { check, validationResult } = require("express-validator"); // Use this to validate POST requests. Use "npm install express-validator" to use it. I chose this one because the errors are very clear and shows where exactly did it happen. You could also use schema (like last week).
const locationsRouter = express.Router();

// Define the validation middleware for POST requests
const validateWordData = [
  check("english")
    .isAlpha()
    .withMessage("Invalid value for English, must contain only letters"),
  check("finnish")
    .isAlpha()
    .withMessage("Invalid value for Finnish, must contain only letters"),
];

locationsRouter.get("/", async (req, res) => {
  const words = await database.findAll();
  res.json(words);
});

locationsRouter.get("/:myId([0-9]+)", async (req, res) => {
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

locationsRouter.delete("/:myId([0-9]+)", async (req, res) => {
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

locationsRouter.post("/", validateWordData, async (req, res) => {
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

// locationsRouter.put(
//   "/:myId([0-9]+)",
//   validateLocationData,
//   async (req, res) => {
//     try {
//       // Check for validation errors
//       const validationErrors = validationResult(req);

//       if (!validationErrors.isEmpty()) {
//         return res.status(400).json({ errors: validationErrors.array() });
//       }

//       const id = parseInt(req.params.myId);
//       const { latitude, longitude } = req.body;

//       const location = await database.updateLocation(id, {
//         latitude,
//         longitude,
//       });

//       if (!location) {
//         console.log(location);
//         res.status(404).send("Can't find location");
//       } else {
//         res.status(200).json(location);
//       }
//     } catch (error) {
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// // Use PATCH to partially update an existing resource
// locationsRouter.patch("/:myId([0-9]+)", async (req, res) => {
//   try {
//     const id = parseInt(req.params.myId);
//     const { latitude, longitude } = req.body;

//     const location = await database.partiallyUpdateLocation(id, {
//       latitude,
//       longitude,
//     });

//     if (!location) {
//       res.status(404).send("Can't find location");
//     } else {
//       res.status(200).json(location);
//     }
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = locationsRouter;
