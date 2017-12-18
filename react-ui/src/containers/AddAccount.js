import React, { Component } from "react";
import { connect } from 'react-redux';
import { register } from '../actions';
import { Modal } from 'react-bootstrap';
import './AddAccount.css';

class AddAccount extends Component {
  constructor(props) {
    super();
    this.state ={
      username: '',
      password: '',
      confirmPassword: '',
      showModal: false
    }
  }
  handleUsername = (event) => {
    this.setState({username: event.target.value})
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }
  handleConfirmPassword = (event) => {
    this.setState({confirmPassword: event.target.value})
  }
  handleSubmit = (event) => {
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
    return (
      <Modal show={this.props.modal} onHide={this.props.hideModal}>
        <div className="Modal-container">
          <h2>One of Us</h2>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label>Username:</label>
              <input value={this.state.username} type='text' placeholder='Username' onChange={this.handleUsername}/>
            </fieldset>
            <fieldset>
              <label>Password:</label>
              <input value={this.state.password} type='password' placeholder='Password' onChange={this.handlePassword}/>
            </fieldset>
            <fieldset>
              <label>Confirm Password:</label>
              <input value={this.state.confirmPassword} type='password' placeholder='Confirm Password' onChange={this.handleConfirmPassword}/>
            </fieldset>
            <button type="submit">Sign Up</button>
            {this.renderAlert()}
          </form>
        </div>
      </ Modal>
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
AddAccount = connect( mapStateToProps,{ register })(AddAccount);
export default AddAccount;

