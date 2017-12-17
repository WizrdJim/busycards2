import React, { Component } from 'react';
import logo from '../logo.svg';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
         <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Busy Cards!!!</h2>
        </div>
        <p className="Home-intro">
          This is a fullstack application built for people to pass around business cards digitally and connect with those around them.
        </p>
      </div>
    )
  }
}