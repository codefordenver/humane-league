import React, { Component } from 'react';
import './App.css';
import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';
import Welcome from '../Welcome/Welcome';

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
        <header>
          <a href='https://thehumaneleague.org/' target='_blank' className='main-site'>
            <img className="App__logo" src={thlLogoWhite} />
          </a>
          <p>This response directly from server: <span style={{color: 'blue'}}>{this.state.serverRes}</span></p>
        </header>
        <Welcome />
      </div>
    );
  }
}

export default App;
