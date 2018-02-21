import React from 'react';
import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Actions/';

const Header = (props) => {
  const userInfo = props.User.name ? <p className="welcome">Welcome, {props.User.name}</p> : null;
  const logoutButton = props.User.name ? <p onClick={props.logout} className="login-logout-btn nav-btn">Logout</p> : null;
  const settings = props.User.name ? <p className="settings-btn nav-btn">Settings</p> : null;
  
  return (
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
      <nav>
        {userInfo}
        {settings}
        {logoutButton}
      </nav>
    </header>
  );
}

const mapStateToProps = store => ({
  User: store.User
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);