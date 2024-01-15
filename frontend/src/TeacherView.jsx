import { useState, useEffect } from "react";
import Footer from "./Footer";

const TeacherView = () => {
  const [newWord, setNewWord] = useState({ english: "", finnish: "" });
  const [words, setWords] = useState([]);
  const [selectedWordId, setSelectedWordId] = useState(null);

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

  const updateWord = (id) => {
    // Aseta valittu sana ja sen tiedot tilaan
    const selectedWord = words.find((word) => word.id === id);
    setNewWord({
      english: selectedWord.english,
      finnish: selectedWord.finnish,
    });
    setSelectedWordId(id);
  };

  const saveUpdatedWord = () => {
    fetch(`http://localhost:8080/api/words/${selectedWordId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
      .then(() => {
        // Päivitä sanat pyynnön jälkeen
        fetchWords();
        // Tyhjennä lomake ja valittu sana
        setNewWord({ english: "", finnish: "" });
        setSelectedWordId(null);
      })
      .catch((error) => console.error("Error updating word:", error));
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
                {selectedWordId === word.id ? (
                  <>
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
                    <button onClick={saveUpdatedWord}>Save</button>
                  </>
                ) : (
                  <button onClick={() => updateWord(word.id)}>Update</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </>
      <Footer />
    </>
  );
};

export default TeacherView;
