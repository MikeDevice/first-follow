import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './layout-header.scss';

function Header({className}) {
  return (
    <header className={classNames(className, 'layout-header')}>
      <h1 className="layout-header__title">First Follow</h1>
      <p className="layout-header__description">
        A small tool for calculating first, follow and predict sets for the grammar
      </p>
      <a
        className="layout-header__link"
        href="https://github.com/MikeDevice/first-follow"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: null,
};

export default Header;
