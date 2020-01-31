import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";

import "./styles.css";

function App(props) {
const onTellJoke = () => {
  fetch ("https://icanhazdadjoke.com/", {
  method:"GET",
  headers: {
    Accept: "application/json"
}
  })
.then(response => response.json())
.then (json => console.log(json))
};

  return <button onClick={onTellJoke}>Tell me a joke</button>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
