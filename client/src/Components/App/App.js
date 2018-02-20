import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import './App.css';
import Header from '../Header/Header';
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
        <Header />
        <Switch>
          <Route path='/admin' component={AdminDashboard} />
          <Route path='/home' component={UserProfile} />
          <Route exact path='/' component={Welcome} />
        </Switch>
      </div>
    );
  }
}

export default App;
