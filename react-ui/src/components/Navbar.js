import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { login, logout } from '../actions';


export default class Navbar extends Component {
  render() {
    const { authenticated, errorMessage, dispatch } = this.props;
    return (
      <nav className='navbar navbar-default'>
        <div className = 'container-fluid'>
          <a className= 'navbar-brand'> BCA</a>
        <div className = 'navbar-form'>
          {!authenticated && 
          <div>
           <Login
            errorMessage = { errorMessage }
            onLoginClick = {(user) => dispatch(login(user, this.props.history))}
            />
            <Link to= 'signup'> Create Account </Link>
          </div>
          }
          
          {authenticated && 
            <div>
              <Logout onLogoutClick = { () => dispatch(logout(this.props.history))}
                />
                <Link to= 'user'> Home </Link>
            </div>
            }
          </div>
        </div>
      </nav>
    )
  }
}