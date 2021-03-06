/* eslint-disable import/no-named-as-default-member */

import React from 'react';
import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';
import fanLogo from '../../assets/fan-logo.png';
import * as actions from '../../Actions/';
import firebase from '../../firebase';

export const Header = ({ User, logout, validateUser, history, location }) => {
  let currentUser = JSON.parse(localStorage.getItem('THL-FAN-USER'));
  
  if (Object.keys(User).length === 0 && currentUser) {
    validateUser(currentUser);
  }

  if (
    Object.keys(User).length === 0 && 
    !currentUser && location.pathname !== '/' 
    && location.pathname !== '/signin' && 
    location.pathname !== '/forgotpassword'
  ) {
    history.push('/');
  }
  
  const userInfo = User.name ? <p className="welcome">Welcome, {User.name.split(' ')[0]}</p> : null;
  const actions = (User.name && !User.admin) ? 
    <NavLink exact to="/home" className="nav-btn"><p>Actions</p></NavLink> : 
    null;
  const profile = (User.name && !User.admin) ? 
    <NavLink exact to="/profile" className="nav-btn"><p>Profile</p></NavLink> : 
    null;
  const adminDash = (User.name && User.admin) ? 
    <NavLink className='nav-btn' exact to='/admin'><p>Dashboard</p></NavLink> : 
    null;
  const adminActions = (User.name && User.admin) ? 
    <NavLink className="nav-btn" exact to="/admin/actions"><p>View Actions</p></NavLink> : 
    null;
  const logoutButton = User.name 
    ? <Link 
      to="/" 
      onClick={() => { 
        firebase.auth().signOut().then(() => {
          logout();
        });
      }}
      className="nav-btn">
      <p className="login-logout-btn">Logout</p></Link> 
    : null;

  return (
    <header>
      <Link
        className='main-site'
        to='/'>
        <img 
          className="App__logo" 
          src={fanLogo} /> Fast Action Network
      </Link>
      <nav>
        {userInfo}
        {actions}
        {profile}
        {adminDash}
        {adminActions}
        {logoutButton}
      </nav>
    </header>
  );
};

const mapStateToProps = store => ({
  User: store.User
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
  validateUser: user => dispatch(actions.updateUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

Header.propTypes = {
  User: PropTypes.object,
  logout: PropTypes.func,
  validateUser: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object
};

