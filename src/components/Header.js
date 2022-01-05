import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <h1 className="title">Memory game</h1>
    </header>
  );
};

export default Header;
