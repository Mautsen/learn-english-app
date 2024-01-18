import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.css";
import TeacherView from "./TeacherView";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Main application component for the English learning game.
 * Handles user interaction, game logic, and rendering of the game view.
 * @function AppView
 * @returns {JSX.Element} - React component.
 */
const AppView = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isEnglishToFinnish, setIsEnglishtoFinnish] = useState(true);

  useEffect(() => {
    // Fetch words from an external API
    fetch(`${import.meta.env.VITE_API_URL}/api/words`)
      .then((response) => response.json())
      .then((data) => setWords(shuffleArray(data)))
      .catch((error) => console.error("Error fetching words:", error));
  }, [isGameFinished]);

  /**
   * Shuffle an array in a random order.
   * @function shuffleArray
   * @param {Array} array - The array to be shuffled.
   * @returns {Array} - Shuffled array.
   */
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  /**
   * Submit the user's answer and handle the game logic.
   * @function handleAnswerSubmit
   * @returns {void}
   */
  const handleAnswerSubmit = () => {
    if (isGameFinished) {
      return; // Show a message when all words have been played
    }

    const isAnswerCorrect =
      (!isEnglishToFinnish &&
        userInput.toLowerCase() ===
          words[currentWordIndex].finnish.toLowerCase()) ||
      (isEnglishToFinnish &&
        userInput.toLowerCase() ===
          words[currentWordIndex].english.toLowerCase());

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentWordIndex((prevIndex) => prevIndex + 1);

    if (currentWordIndex + 1 === words.length) {
      setIsGameFinished(true);
    }

    setUserInput("");
  };

  /**
   * Restart the game by resetting state variables.
   * @function handleRestartGame
   * @returns {void}
   */
  const handleRestartGame = () => {
    setIsGameFinished(false);
    setCurrentWordIndex(0);
    setScore(0);
    setUserInput("");
  };

  /**
   * Toggle between English to Finnish and Finnish to English.
   * Restart the game when changing the language.
   * @function handleLanguageToggle
   * @returns {void}
   */
  const handleLanguageToggle = () => {
    setIsEnglishtoFinnish((prevValue) => !prevValue);
    handleRestartGame();
  };

  if (words.length === 0) {
    return <p>Loading...</p>;
  }

  const translation = {
    translateWord: isEnglishToFinnish
      ? "English to Finnish"
      : "Finnish to English",
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
        className="card"
        variant="soft"
        style={{
          width: 300,
          margin: "auto",
          marginTop: 50,
          borderRadius: 16,
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
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/teacher" element={<TeacherView />} />
          <Route path="/" element={<AppView />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
