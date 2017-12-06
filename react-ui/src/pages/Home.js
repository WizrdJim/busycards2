import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
         <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Busy Cards!!!</h2>
        </div>
        <p className="App-intro">
          This is a fullstack application built to people to pass around business cards digitally and connect with those around them.
        </p>
      </div>
    )
  }
}