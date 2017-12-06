import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { connect } from 'react-redux';
import {Route, withRouter } from 'react-router-dom';

import * as Pages from './pages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    const { dispatch, authenticated, errorMessage } = this.props;
    return (
      <div className="App">
        <Navbar
          authenticated = { authenticated }
          errorMessage = { errorMessage }
          dispatch = { dispatch }
          history = { this.props.history }
        />
        <div>
          <Route exact path="/" component ={Pages.Home} />
          <Route path="/signup" component = { Pages.CreateUser } />
          <Route path="/updatecard" component = {Pages.UpdateCard} />
          <Route path="/user" component = {Pages.User} />
          <Route path="/findcards" component = {Pages.FindCard} />
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {'This is '}
          <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/>
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { authenticated, errorMessage } = auth;
  return{
    authenticated,
    errorMessage
  }
}

export default withRouter(connect(mapStateToProps)(App));
