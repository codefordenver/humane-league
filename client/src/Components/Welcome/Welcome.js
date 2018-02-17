import React, { Component } from 'react';
import fanLogo from '../../assets/fan-logo.png';
import './Welcome.css';


class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    }
  }

  handleClick = () => {
    this.setState({ showForm: true });
  }

  render() {
    const signInPrompt = 
      <h1 className='welcome-controls'>
        <span onClick={this.handleClick}>create account</span>/
        <span onClick={this.handleClick}>sign-in</span>
      </h1>;

    const accountForm = 
      <form className='create-account-form'>
        <input className='create-account-user-input' type='text' placeholder='user-name' />
        <button className='create-account-submit' >Create Account</button>
      </form>;

    const imgClassName = !this.state.showForm ? 'fan-logo' : 'fan-logo shifted';
    const welcomeClassName = !this.state.showForm ? 'Welcome' : 'Welcome shifted';

    const controls = !this.state.showForm ? signInPrompt : accountForm;

    return (
      <div className={welcomeClassName}>
        <img className={imgClassName} src={fanLogo} alt='' />
        {controls}
      </div>
    )
  }
}

export default Welcome;