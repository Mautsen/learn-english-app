import { useState, useEffect } from "react";
import Footer from "./Footer";

/**
 * TeacherView component for managing and interacting with words in the React application.
 *
 * The TeacherView component allows teachers to add, edit, and delete words. It communicates
 * with the backend API to perform CRUD operations on the words.
 *
 * @component
 * @name TeacherView
 * @returns {JSX.Element} - Returns the TeacherView component with word management functionality.
 */
const TeacherView = () => {
  // State variables for managing new words, edited words, and the list of words
  const [newWord, setNewWord] = useState({ english: "", finnish: "" });
  const [editWord, setEditWord] = useState({
    id: null,
    english: "",
    finnish: "",
  });
  const [words, setWords] = useState([]);

  /**
   * Function to fetch words from the backend API.
   *
   * @kind function
   * @name fetchWords
   * @returns {void}
   */
  const fetchWords = () => {
    // Make HTTP GET request to the backend to fetch words
    fetch(`${import.meta.env.VITE_API_URL}/api/words`)
      .then((response) => response.json())
      .then((data) => setWords(data))
      .catch((error) => console.error("Error fetching words:", error));
  };

  /**
   * Function to add a new word to the backend.
   *
   * @kind function
   * @name addWord
   * @returns {void}
   */
  const addWord = () => {
    // Make HTTP POST request to the backend to add a new word
    fetch(`${import.meta.env.VITE_API_URL}/api/words`, {
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

  /**
   * Function to set the selected word for editing.
   *
   * @kind function
   * @name updateWord
   * @param {number} id - The ID of the word to be edited.
   * @returns {void}
   */
  const updateWord = (id) => {
    // Set the selected word to a state
    const selectedWord = words.find((word) => word.id === id);
    setEditWord({
      id,
      english: selectedWord.english,
      finnish: selectedWord.finnish,
    });
  };

  /**
   * Function to save the updated word to the backend.
   *
   * @kind function
   * @name saveUpdatedWord
   * @returns {void}
   */
  const saveUpdatedWord = () => {
    // Make HTTP PUT request
    fetch(`${import.meta.env.VITE_API_URL}/api/words/${editWord.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        english: editWord.english,
        finnish: editWord.finnish,
      }),
    })
      .then(() => {
        // Update the words shown
        fetchWords();
        // Empty the input fields
        setEditWord({ id: null, english: "", finnish: "" });
      })
      .catch((error) => console.error("Error updating word:", error));
  };

  /**
   * Function to delete a word from the backend.
   *
   * @kind function
   * @name deleteWord
   * @param {number} id - The ID of the word to be deleted.
   * @returns {void}
   */
  const deleteWord = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/words/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchWords();
      })
      .catch((error) => console.error("Error deleting word:", error));
  };

  // Fetch words when the component mounts
  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <>
      {/* TeacherView content */}
      <h1>Teacher</h1>
      <div>
        {/* Form for adding a new word */}
        <h2>Add Word</h2>
        <input
          type="text"
          placeholder="English"
          value={newWord.english}
          onChange={(e) => setNewWord({ ...newWord, english: e.target.value })}
        />
        <input
          type="text"
          placeholder="Finnish"
          value={newWord.finnish}
          onChange={(e) => setNewWord({ ...newWord, finnish: e.target.value })}
        />
        <button onClick={addWord}>Add</button>
      </div>
      <div>
        {/* List of words with options to edit and delete */}
        <h2>Words</h2>
        <ul>
          {words.map((word) => (
            <li key={word.id}>
              {word.english} - {word.finnish}
              {/* Edit mode when editing a word */}
              {editWord.id === word.id ? (
                <>
                  <input
                    type="text"
                    placeholder="English"
                    value={editWord.english}
                    onChange={(e) =>
                      setEditWord({ ...editWord, english: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Finnish"
                    value={editWord.finnish}
                    onChange={(e) =>
                      setEditWord({ ...editWord, finnish: e.target.value })
                    }
                  />
                  <button onClick={saveUpdatedWord}>Save</button>
                </>
              ) : (
                <>
                  {/* Button to enter edit mode */}
                  <button onClick={() => updateWord(word.id)}>Update</button>
                </>
              )}
              {/* Button to delete the word */}
              <button onClick={() => deleteWord(word.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Footer component at the bottom of the page */}
      <Footer />
    </>
  );
};

export default TeacherView;
