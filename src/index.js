import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
// name changed
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    //typically dont modify this directly
    this.state = {
      jokes: [],
      isFetchingJoke: false
    };
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  componentDidMount() {
    this.searchJokes();
  }

  searchJokes() {
    this.setState({ isFetchingJoke: true });
    fetch("https://icanhazdadjoke.com/search", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        this.setState({
          jokes,
          isFetchingJoke: false
        });
        //set.state usually a request not a command
        //this.setState({ joke: json.joke, isFetchingJoke: false });
        // console.log("joke", this.joke);
        console.log("jokes", jokes);
      });
  }

  onTellJoke() {
    this.searchJokes();
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Enter search term..." />
          <button>Search</button>
          <button
            onClick={this.onTellJoke}
            disabled={this.state.isFetchingJoke}
          >
            Tell me a joke
          </button>
        </form>

        <p>{this.state.jokes.toString()}</p>
        {/* <p>isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// TO DO LIST
//1. Call Search joke endpoint, and store results
//2. Save search input's value in app state
//3. Trigger search on form submission
//4. render the search results
//5. hook up the I'm feeling lucky button
//6. create search form component
//7. refactoring & clean up
//8. add styling
