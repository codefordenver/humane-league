import React from 'react';
import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';
import { Link } from 'react-router-dom';

const Header = () => {
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
        <p className="welcome">Welcome, Katie</p>
        <Link to="/profile"><p className="settings-btn nav-btn">Profile</p></Link>
        <p className="login-logout-btn nav-btn">Logout</p>
      </nav>
    </header>
  );
}

export default Header;