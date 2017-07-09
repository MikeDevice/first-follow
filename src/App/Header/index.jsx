import React from 'react';
import './header.scss';

function Header() {
  return (
    <header className="header">
      <h1>First Follow</h1>
      <p>Calculator for finding first, follow and predict sets</p>
      <a
        href="https://github.com/MikeDevice/first-follow"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </header>
  );
}

export default Header;
