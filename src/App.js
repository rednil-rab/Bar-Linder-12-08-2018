import React from 'react';
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './containers/Navbar'
import SearchPage from './containers/SearchPage/SearchPage'
import Favorites from './containers/Favorites/Favorites'
import './App.css';



class App extends Component {
  state = {

  }
  componentDidMount() {

  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          {/* <nav>
          <ul>
            <li><a href="/new-search">Weather</a></li>
            <li><a href="/favortites">Favorites</a></li>
          </ul>
        </nav> */}
          <Navbar></Navbar>
          <Favorites></Favorites>
          <SearchPage></SearchPage>
          {/* <Geolocation></Geolocation> */}
        </div>
      </BrowserRouter>

    )
  }
}

export default App;
