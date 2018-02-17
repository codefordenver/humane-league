import React, { Component } from 'react';
import fanLogo from '../../assets/fan-logo.png';
import './Welcome.css';


class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      formUp: false,
    }
  }

  handleClick = () => {
    console.log(this.state.formUp)
    this.setState({ formUp: true })
    console.log(this.state.formUp)

  }

  render() {
    const imgClassName = !this.state.formUp ? 'fan-logo' : 'fan-logo shifted'
    return (
      <div className='Welcome'>
        <img className={imgClassName} src={fanLogo} alt='' />
        <h1 className='welcome-controls'>
          <span onClick={this.handleClick}>create account</span>/
          <span onClick={this.handleClick}>sign-in</span>
        </h1>
      </div>
    )
  }
}

export default Welcome;