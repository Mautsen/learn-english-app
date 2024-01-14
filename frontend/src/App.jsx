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
  const [isEnglishToFinnish, setIsEnglishtoFinnish] = useState(true);

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
    const isAnswerCorrect =
      (!isEnglishToFinnish &&
        userInput.toLowerCase() ===
          words[currentWordIndex].finnish.toLowerCase()) ||
      (isEnglishToFinnish &&
        userInput.toLowerCase() ===
          words[currentWordIndex].english.toLowerCase());

    if (isAnswerCorrect) {
      // If correct, add points
      setScore((prevScore) => prevScore + 1);
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

  const handleLanguageToggle = () => {
    // Toggle between English to Finnish and Finnish to English
    setIsEnglishtoFinnish((prevValue) => !prevValue);

    // Restart the game when changing the language
    handleRestartGame();
  };

  if (words.length === 0) {
    return <p>Loading...</p>;
  }

  const translation = {
    translateWord: isEnglishToFinnish
      ? "Finnish to English"
      : "English to Finnish",
    translatePrompt: isEnglishToFinnish
      ? "Käännä sana:"
      : "Translate the word:",
    allWordsPlayed: isEnglishToFinnish
      ? "Kaikki sanat on pelattu!"
      : "All words have been played!",
    answerButton: isEnglishToFinnish ? "Vastaa" : "Answer",
    restartButton: isEnglishToFinnish ? "Aloita alusta" : "Restart",
    points: isEnglishToFinnish ? "Pisteet" : "Points",
  };

  return (
    <div>
      <div style={{ textAlign: "right", margin: "10px" }}>
        <Button
          variant="outlined"
          onClick={handleLanguageToggle}
          style={{ backgroundColor: "white" }}
        >
          {translation.translateWord}
        </Button>
      </div>
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
            {translation.translatePrompt}
          </Typography>
          <Typography variant="h3" component="div" style={{ marginBottom: 20 }}>
            {isGameFinished
              ? translation.allWordsPlayed
              : isEnglishToFinnish
              ? words[currentWordIndex].finnish
              : words[currentWordIndex].english}
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
              {translation.answerButton}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleRestartGame}
              style={{ marginTop: 20 }}
            >
              {translation.restartButton}
            </Button>
          )}
          <Typography variant="body2" component="div" style={{ marginTop: 20 }}>
            {`${translation.points}: ${score}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
