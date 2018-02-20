import React from 'react';
import thlLogoWhite from '../../THL-Assets/png/THL18-horiz-logo-white.png';

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
          <p>This</p>
    </header>
  );
}

export default Header;