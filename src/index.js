import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";

//
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    //typically dont modify this directly
    this.state = {
      joke: null,
      isFetchingJoke: false
    };
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  componentDidMount() {}
  FetchJoke() {
    this.setState({ isFetchingJoke: true });

    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        //set.state usually a request not a command
        this.setState({ joke: json.joke, isFetchingJoke: false });
        // console.log("joke", this.joke);
      });
  }

  onTellJoke() {
    this.FetchJoke();
  }

  render() {
    console.log("-----RENDER-----");

    return (
      <div>
        <button onClick={this.onTellJoke}>Tell me a joke</button>
        <p>{this.state.joke}</p>
        <p>isFetchingJoke: {this.state.isFetchingJoke.toString()}</p>
      </div>
    );
  }

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
