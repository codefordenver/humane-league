/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-undef */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import firebase from '../../firebase';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      status: null
    };
  }

  handleChange = (evt) => {
    const {name, value} = evt.target;
    this.setState({[name]: value});
  }

  handleSubmit = () => {
    firebase.auth().sendPasswordResetEmail(this.state.email);
    const msg = `🚀 A link was sent to ${this.state.email} - Check your email shortly!🚀 `;
    this.setState({status: msg});
  }


  render() {
    return (
      <div className="ForgotPassword">
        <h1>Reset Password</h1>
        <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
        <span>{this.state.status}</span>
        <button onClick={this.handleSubmit}>Send Reset Link</button>
        <Link to="/signin">Back to Sign In</Link>
      </div>
    );
  }
}
export default ForgotPassword;