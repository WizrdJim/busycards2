import React, { Component } from 'react';
import logo from '../logo.svg';
import './Home.css';
import { dumbLocation } from '../actions';
import NearbyCards from '../containers/NearbyCards.js';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props){
    super();
    this.state={
      location: false,
    };
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    const success = (pos) => {
      const crd = pos.coords;
      this.setState({
        latitude: crd.latitude,
        longitude: crd.longitude,
        location: true,
      });
      console.log('Crd in App: ' + crd)
      this.props.dispatch(dumbLocation(crd));
    };
    
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

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
        {this.state.location ? <NearbyCards latitude={this.state.latitude} longitude={this.state.longitude}/> : null}
      </div>
    )
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

export default withRouter(connect(mapStateToProps/*, { dumbLocation }*/)(Home));