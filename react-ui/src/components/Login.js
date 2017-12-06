import React, { Component } from 'react';

export default class Login extends Component {
  handleClick(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const user = { username: username.value.trim(), password: password.value.trim()}
    this.props.onLoginClick(user, this.props.history);
  }
  render() {
    const { errorMessage } = this.props;
    return(
      <div>
        <form>
        <input type= 'text' ref='username' className="form-control" placeholder='Username'/>
        <input type= 'password' ref='password' className="form-control" placeholder= 'Password'/>
        <button onClick = {( event ) => this.handleClick(event)} className= "btn btn-primary">
          Login
        </button>
        { errorMessage && 
          <p> {errorMessage}</p>
        }
        </form>
        <p>{this.props.history}</p>
      </div>
    );
  }
}