import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { register } from '../actions';

class CreateUser extends Component {
  constructor() {
    super();
    this.state ={
      username: '',
      password: '',
      confirmPassword: ''
    }
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsername(event) {
    this.setState({username: event.target.value})
  }
  handlePassword(event) {
    this.setState({password: event.target.value})
  }
  handleConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    const {username, password, confirmPassword} = this.state;
    const user = {
      username,
      password,
      confirmPassword
    };
    console.log('username: ' + username);
    console.log(confirmPassword);
    this.props.register(user, this.props.history);
  }
  renderAlert = () => {
    if (!this.props.errorMessage) return null;
    return (
      <h3> {this.props.errorMessage} </h3>
    ) 
  };
  render() {
    // Use reduxForm to build the sign up form
    // Check the other components to see how reduxForm is used
    // There needs fields for Username, Password, and Confirm Password
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <fieldset>
            <label>Username:</label>
            <input value={this.state.username} type = 'text' placeholder ='Username' onChange={this.handleUsername}/>
          </fieldset>
          <fieldset>
            <label>Password:</label>
            <input value={this.state.password} type = 'password' placeholder ='Password' onChange={this.handlePassword}/>
          </fieldset>
          <fieldset>
            <label>Confirm Password:</label>
            <input value={this.state.confirmPassword} type = 'password' placeholder ='Confirm Password' onChange={this.handleConfirmPassword}/>
          </fieldset>
          <button type = "submit">Sign Up</button>
          {this.renderAlert()}
        </form>
      <div>Sign Up</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.errorMessage,
    authenticated: state.auth.authenticated
  };
};

// Make sure to correctly fill in this `connect` call
CreateUser = withRouter(connect( mapStateToProps,{ register })(CreateUser));
export default CreateUser;

