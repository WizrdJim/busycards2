import React, { Component } from 'react';
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
      fetching: true,
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
          authenticated={ authenticated }
          errorMessage={ errorMessage }
          dispatch={ dispatch }
          history={ this.props.history }
        />
        <div className="App-warning">
          <h4>
            This website is by no means secure and highly experimental I will not vouch for the security of usernames or passwords. USE AT OWN RISK.
          </h4>
          <p style={{color: 'green'}}>
            My personal favorite password is test!
          </p>
        </div>
        <div className="Content-container center-block container-fluid">
          <div>
            <Route exact path="/" component={Pages.Home} />
            <Route path="/signup" component={ Pages.CreateUser } />
            <Route path="/updatecard" component={Pages.UpdateCard} />
            <Route path="/user" component={Pages.User} />
            <Route path="/findcards" component={Pages.FindCard} />
          </div>
          <p className="App-intro">
            {this.state.fetching
              ? 'Fetching message from API'
              : this.state.message}
          </p>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { authenticated, errorMessage } = auth;

  return{
    authenticated,
    errorMessage,
  }
}

export default withRouter(connect(mapStateToProps/*, { dumbLocation }*/)(App));