import React from "react";
import ReactDOM from "react-dom";
import Application from "./App";

function App() {
  return (
    <React.StrictMode>
      <Application />
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
