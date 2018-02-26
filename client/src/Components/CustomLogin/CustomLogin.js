import React, { Component } from 'react'
import './CustomLogin.css';
import firebase from '../../firebase';
import { connect } from 'react-redux';


class CustomLogin extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="CustomLogin">
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Password"/>
        <input type="text" />

      </div>
    )
  }
}

const mapStateToProps = store => ({
  User: store.User
});

const mapDispatchToProps = dispatch => ({
  validateUser: user => dispatch(actions.updateUser(user))
});



export default CustomLogin;