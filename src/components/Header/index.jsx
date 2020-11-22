import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './header.scss';

function Header({title, description, link, linkText, className}) {
  return (
    <header className={classNames(className, 'header')}>
      <h1 className="header__title">{title}</h1>
      <p className="header__description">{description}</p>
      <a
        className="header__link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: null,
};

export default Header;
