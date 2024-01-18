import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

/**
 * Render the React application in the root element.
 *
 * This is the main entry point for the React application. It uses React Strict Mode
 * to catch common mistakes and improve the development experience.
 *
 * @component
 * @kind function
 * @name RenderApp
 * @param {string} rootId - The ID of the root element where the React app will be rendered.
 * @returns {void}
 * @throws {Error} Throws an error if the root element with the provided ID is not found.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  /**
   * Wraps the main app component in a React Strict Mode.
   *
   * @kind function
   * @name StrictMode
   * @param {Object} props - React Strict Mode component props.
   * @returns {JSX.Element} - Returns the main app component wrapped in Strict Mode.
   */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
