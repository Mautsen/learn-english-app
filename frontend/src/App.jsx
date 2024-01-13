import { useState, useEffect } from "react";

const App = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch words from database
    fetch("http://localhost:8080/api/words")
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error("Error fetching words:", error));
  }, []);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleAnswerSubmit = () => {
    // Check users answer
    if (
      userInput.toLowerCase() === words[currentWordIndex].finnish.toLowerCase()
    ) {
      // if correct, add points
      setScore(score + 1);
    }

    // next word
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    setUserInput("");
  };

  if (words.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Word Game</h1>
      <p>Translate the word:</p>
      <p>{words[currentWordIndex].english}</p>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleAnswerSubmit}>Submit Answer</button>
      <p>Score: {score}</p>
    </div>
  );
};

export default App;
