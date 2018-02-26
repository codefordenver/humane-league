import React, { Component } from 'react';
import './ForgotPassword.css';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      validLink: false
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="ForgotPassword">
        <input type="text" />
      </div>
    )
  }
}
export default ForgotPassword;