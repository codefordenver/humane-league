import React, { Component } from 'react';
import './ResetPassword.css';
import firebase from '../../firebase';


class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      validLink: false,
      password: '',
      confirmPass: '',
      disableButton: true,
      passMatchStatus: null
    };
  }

  componentDidMount() {
    console.log(this.props);
    // firebase.auth().verifyPasswordResetCode
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (
      this.password.value.length > 5 &&
      this.password.value === this.confirmPass.value
    ) {
      this.setState({disableButton: false, passMatchStatus: '✅' });
    } else {
      this.setState({disableButton: true, passMatchStatus: '❌' }); 
    }

  }

  render() {
    return (
      <div className="ForgotPassword">
        <h1>Reset Password</h1>
        <h5>Passwords must be at least 6 characters long.</h5>
        <label>Password: </label>
        <input ref={(input) => this.password = input} placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} type="text" />
        <label>Confirm Password: </label>
        <div className="confirmWrapper">
          <input 
            ref={(input) => { this.confirmPass = input }} 
            name="confirmPass" 
            onChange={this.handleChange} 
            value={this.state.confirmPass}
            type="password" 
            placeholder="Confirm Password" />
          <span>{this.state.passMatchStatus}</span>
        </div> 
        <button disabled={this.state.disableButton}>Change Password</button>
      </div>
    )
  }
}
export default ForgotPassword;