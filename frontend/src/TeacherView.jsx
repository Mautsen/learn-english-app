import { useState, useEffect } from "react";

function TeacherView() {
  const [newWord, setNewWord] = useState({ english: "", finnish: "" });
  const [words, setWords] = useState([]);

  const fetchWords = () => {
    // Make HTTP GET request to the backend to fetch words
    fetch("http://localhost:8080/api/words")
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error("Error fetching words:", error));
  };

  const addWord = () => {
    // Make HTTP POST request to the backend to add a new word
    fetch("http://localhost:8080/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
      .then(() => {
        // Refresh words after the update
        fetchWords();
        // Clear the form
        setNewWord({ english: "", finnish: "" });
      })
      .catch((error) => console.error("Error adding word:", error));
  };

  useEffect(() => {
    // Fetch words when the component mounts
    fetchWords();
  }, []);

  return (
    <>
      <>
        <h1>Teacher</h1>
        <div>
          <h2>Add Word</h2>
          <input
            type="text"
            placeholder="English"
            value={newWord.english}
            onChange={(e) =>
              setNewWord({ ...newWord, english: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Finnish"
            value={newWord.finnish}
            onChange={(e) =>
              setNewWord({ ...newWord, finnish: e.target.value })
            }
          />
          <button onClick={addWord}>Add Word</button>
        </div>
        <div>
          <h2>Words</h2>
          <ul>
            {words.map((word) => (
              <li key={word.id}>
                {word.english} - {word.finnish}
              </li>
            ))}
          </ul>
        </div>
      </>
    </>
  );
}

export default TeacherView;
