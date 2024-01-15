import { useState } from "react";
import App from "./App.jsx";

function TeacherView() {
  const [showDefaulfView] = useState(false);

  return (
    <>
      {showDefaulfView ? (
        // If defaultView == true show this
        <App />
      ) : (
        // If it's false, show this
        <>
          <div></div>
          <h1>Teacher</h1>
          <div className=""></div>
        </>
      )}
    </>
  );
}

export default TeacherView;
