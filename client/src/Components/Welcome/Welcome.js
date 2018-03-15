/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fanLogo from '../../assets/fan-logo.png';
import './Welcome.css';
import firebase from '../../firebase';
import * as actions from '../../Actions/';
import { signInUser } from '../../utils/apiCalls';

export class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      errorMessage: null
    };
  }

  handleClick = (prov) => {
    this.setState({ showForm: true });

    const providers = {
      facebook: new firebase.auth.FacebookAuthProvider(), 
      google: new firebase.auth.GoogleAuthProvider()
    };

    firebase.auth().signInWithPopup(providers[prov]).then( async result => {
      const user = result.user;

      const { displayName, email, uid } = user;

      const dbUser = await signInUser(uid, displayName, email);

      this.props.validateUser(dbUser);
      localStorage.setItem('THL-FAN-USER', JSON.stringify(dbUser));

      if (dbUser.user.admin) {
        this.props.history.push('/admin');
      } else {
        this.props.history.push('/home');
      }
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    const hiddenButtons = this.state.showForm ? '' : 'hidden';
    const primaryButton = this.state.showForm ? 'none' : 'primary';
    
    const expandOptions = 
    <div className='welcome-controls'>
      <button className={primaryButton} onClick={() => this.setState({showForm: true})}>Sign In</button>
      <button className={hiddenButtons} onClick={() => this.handleClick('google')}>Sign In With Google</button>
      <button className={hiddenButtons} onClick={() => this.handleClick('facebook')}>Sign In With Facebook</button>
      <button className={hiddenButtons} onClick={() => this.props.history.push('/signin')}>Sign In With Email</button>
    </div>;

    const conditionalInfo = this.props.User.name ? <Link to="/home">Dashboard</Link> : expandOptions;

    return (
      <div className='Welcome'>
        <img className='fan-logo' src={fanLogo} alt='' />
        <div>
          <p className="welcome-description">Welcome to The Humane League&#39;s Fast Action Network! FAN gives individuals a way to be heard by the largest corporations in the world. Whether it is by signing a petition, sending a tweet, emailing a CEO, or posting a quick comment on Facebook, this team comes together for a few minutes each week to call on companies to end their support of the worst factory farm cruelties, and it works! When activists like yourself come together for animals, the opportunities are endless!</p>
          {conditionalInfo}
          {this.state.errorMessage}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  User: store.User
});

const mapDispatchToProps = dispatch => ({
  validateUser: user => dispatch(actions.updateUser(user))
});



export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

Welcome.propTypes = {
  User: PropTypes.object,
  history: PropTypes.object,
  validateUser: PropTypes.func
};