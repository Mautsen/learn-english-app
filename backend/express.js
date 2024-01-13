const express = require("express");
const locationsRouter = require("./routes/words");
const config = require("./database/config.js");
const port = 8080;
const app = express();
const cors = require("cors");

// takes body and makes it to object req.body
app.use(express.json());

// Allow anyone to make a fetch API request
app.use(cors());

// Everything we have in frontend/dist/-folder is shown as is
app.use(express.static("./frontend/dist"));

app.use("/api/words", locationsRouter);

const server = app
  .listen(port, () => {
    console.log(`SERVER: Listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server", err);
    process.exit(1);
  });

// app.get("/api/locations", (req, res) => {
//   config.query(
//     "SELECT CONNECTION_ID() AS ConnID, locations.* FROM locations",
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       console.log("ConnectionID: ", results[0]["ConnID"]);
//       res.json(results);
//     }
//   );
// });

// let server = undefined;
// config.connect((err) => {
//   // mysql connection
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     process.exit(1);
//   } else {
//     console.log("MySQL connection successful.");
//     // Start the server and listen on the specified port
//     server = app
//       .listen(port, () => {
//         console.log(`SERVER: listening on port ${port}`);
//       })
//       .on("error", (err) => {
//         console.error("Error starting server:", err);
//         process.exit(1);
//       });
//   }
// });

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

// Ensures that the database connections are not left open when the application stops running
process.on("SIGTERM", gracefulShutdown); // Some other app requirest shutdown.
process.on("SIGINT", gracefulShutdown); // ctrl-c
// Run with node not nodemon to see all the shutdown messages in console.
