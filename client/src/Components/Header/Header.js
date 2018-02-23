import React from 'react';
import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Actions/';

const Header = ({ User, logout, validateUser }) => {
  let currentUser = JSON.parse(localStorage.getItem('THL-FAN-USER'));
  if (Object.keys(User).length === 0 && currentUser) {
    validateUser(currentUser);
  }
  
  const userInfo = User.name ? <p className="welcome">Welcome, {User.name}</p> : null;
  const actions = (User.name && !User.admin) ? <Link to="/home"><p className="nav-btn">Actions</p></Link> : null;
  const profile = (User.name && !User.admin) ? <Link to="/profile"><p className="settings-btn nav-btn">Profile</p></Link> : null;
  const logoutButton = User.name 
    ? <Link to="/"><p onClick={logout} className="login-logout-btn nav-btn">Logout</p></Link> 
    : <Link to="/"><p onClick={logout} className="login-logout-btn nav-btn">Login</p></Link>;

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
        {actions}
        {profile}
        {logoutButton}
      </nav>
    </header>
  );
}

const mapStateToProps = store => ({
  User: store.User
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
  validateUser: user => dispatch(actions.updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);