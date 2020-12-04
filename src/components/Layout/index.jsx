import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import './layout.scss';

function Layout({children}) {
  return (
    <div className="layout">
      <Header className="layout__header" />
      <main className="layout__main">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
