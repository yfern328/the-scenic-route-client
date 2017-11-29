import React, { Component } from 'react';
import SearchAddressPage from '../pages/SearchAddressPage'
import ViewRoutesPage from '../pages/ViewRoutesPage'
import HomePage from '../pages/HomePage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../App.css';

class App extends Component {

  // state = {
  //   userName: 'Guest',
  //   loggedIn: false,
  // }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={ HomePage } />
            <Route exact path='/map' component={ SearchAddressPage } />
            <Route exact path='/routes' render={ () => <ViewRoutesPage /> } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
