import React from "react";
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
// import App from "./App";
// name changed
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    //typically dont modify this directly
    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJokes: false
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  // componentDidMount() {
  //   this.searchJokes();
  // }

  searchJokes(limit = 5) {
    this.setState({ isFetchingJokes: true });

    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.searchTerm
      }&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        console.log("jokes", jokes);
        this.setState({
          jokes,
          isFetchingJokes: false
        });
        //set.state usually a request not a command
        //this.setState({ joke: json.joke, isFetchingJokes: false });
        // console.log("joke", this.joke);
      });
  }

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  // Breaking my rendering up into smaller chuncks
  renderJokes() {
    return (
      <ul className="jokes-list">
        {this.state.jokes.map(item => (
          <li key={item.id}>{item.joke}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <img className="logo" alt="nedlogo" src="./img/flanders.jpg" />
        <SearchForm
          // all data referances handled in the SearchForm.js
          onFormSubmit={this.searchJokes}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJokes}
          onSingleSearchClick={() => this.searchJokes(1)}
        />

        {this.state.isFetchingJokes
          ? "searching for a joke..."
          : this.renderJokes()}

        {/* <p>isFetchingJokes: {this.state.isFetchingJokes.toString()}</p> */}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// TO DO LIST
// DONE - 1. Call Search joke endpoint, and store results
// DONE- 2. Save search input's value in app state
// DONE - 3. Trigger search on form submission
// DONE - 4. render the search results
// DONE -  5. hook up the I'm feeling lucky button
// DONE -  6. create search form component
// DONE -   7. refactoring & clean up
//8. add styling
