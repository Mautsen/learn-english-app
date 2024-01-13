import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.css";

const App = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    // Fetch words from an external API
    fetch("http://localhost:8080/api/words")
      .then((response) => response.json())
      .then((data) => setWords(shuffleArray(data))) // Shuffle the words
      .catch((error) => console.error("Error fetching words:", error));
  }, [isGameFinished]);

  const shuffleArray = (array) => {
    // Shuffle the words in a random order
    return array.sort(() => Math.random() - 0.5);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleAnswerSubmit = () => {
    if (isGameFinished) {
      // Show a message when all words have been played
      return;
    }

    // Check users answer
    if (
      userInput.toLowerCase() === words[currentWordIndex].english.toLowerCase()
    ) {
      // If correct, add points
      setScore(score + 1);
    }

    // Move to the next word
    setCurrentWordIndex((prevIndex) => prevIndex + 1);

    if (currentWordIndex + 1 === words.length) {
      // All words have been played
      setIsGameFinished(true);
    }

    setUserInput("");
  };

  const handleRestartGame = () => {
    setIsGameFinished(false);
    setCurrentWordIndex(0);
    setScore(0);
    setUserInput("");
  };

  if (words.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Card
        variant="soft"
        style={{
          width: 300,
          margin: "auto",
          marginTop: 50,
          borderRadius: 16,
          backgroundColor: "#b8dbf0",
          boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="div" style={{ marginBottom: 20 }}>
            Käännä sana:
          </Typography>
          <Typography variant="h3" component="div" style={{ marginBottom: 20 }}>
            {isGameFinished
              ? "Kaikki sanat käyty läpi!"
              : words[currentWordIndex].finnish}
          </Typography>
          <TextField
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyUp={(e) => e.key === "Enter" && handleAnswerSubmit()}
          />
          {!isGameFinished ? (
            <Button
              variant="contained"
              onClick={handleAnswerSubmit}
              style={{ marginTop: 20 }}
            >
              Vastaa
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleRestartGame}
              style={{ marginTop: 20 }}
            >
              Aloita alusta
            </Button>
          )}
          <Typography variant="body2" component="div" style={{ marginTop: 20 }}>
            Pisteet: {score}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
