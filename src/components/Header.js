import React from 'react';

import logo from '../images/snake_logo.png';
const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <img src={logo} className='header_logo' alt='Snake - Logo' />
      </div>
    </header>
  );
};

export default Header;
