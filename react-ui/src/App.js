import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { connect } from 'react-redux';
import {Route, withRouter } from 'react-router-dom';
import AddAccount from './containers/AddAccount';

import * as Pages from './pages';
const Home = Pages.Home;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
      modal: false,
    };
  }

  displayModal = () => {
    this.setState({
      modal: true,
    })
    console.log("Bing")
  }

  hideModal = () => {
    this.setState({
      modal: false,
    })
    console.log("Bong")
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
          onClick={ this.displayModal }
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
        <AddAccount modal={this.state.modal} hideModal={this.hideModal}/>
        <Home />
          <div>
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