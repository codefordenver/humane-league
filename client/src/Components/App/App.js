import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import './App.css';
import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';
import Welcome from '../Welcome/Welcome';
import UserProfile from '../UserProfile/UserProfile';
import AdminDashboard from '../AdminDashboard/AdminDashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverRes: null
    }
  }
  async componentWillMount() {
    // const test = await fetch('/test');
    // console.log(test);
    // const res = await test.json();
    // this.setState({
    //   serverRes: res.status
    // });
  }
  render() {
    return (
      <div className="App">
        <header>
          <a 
            className='main-site'
            target='_blank' 
            rel='noopener noreferrer' 
            href='https://thehumaneleague.org/'>
            <img 
              className="App__logo" 
              src={thlLogoWhite} />
          </a>
          <p>This response directly from server: <span style={{color: 'blue'}}>{this.state.serverRes}</span></p>
        </header>
        
        <Switch>
          <Route path='/admin' component={AdminDashboard} />
          <Route path='/profile' component={UserProfile} />
          <Route exact path='/' component={Welcome} />
        </Switch>
      </div>
    );
  }
}

export default App;
