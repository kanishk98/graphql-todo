import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';

// Pages in router
import Login from './components/Login';

// Constants file
import Constants from './Constants';

firebase.initializeApp(Constants.firebaseConfig);

class App extends Component {
  static async isLoggedIn() {
    let loggedIn = await window.localStorage.getItem('loggedIn');
    console.log(loggedIn);
    return loggedIn;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route path="/" name="Login Page" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
