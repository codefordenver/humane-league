import React, { Component } from 'react';
import './App.css';
import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverRes: null
    }
  }
  async componentWillMount() {
    const test = await fetch('/test');
    console.log(test);
    const res = await test.json();
    this.setState({
      serverRes: res.status
    });
  }
  render() {
    return (
      <div className="App">
        <img className="App__logo" src={thlLogoWhite} />
        <h1>This response directly from server: <span style={{color: 'blue'}}>{this.state.serverRes}</span></h1>
      </div>
    );
  }
}

export default App;
