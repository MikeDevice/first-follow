import React from 'react';
import PropTypes from 'prop-types';

function Terminal({ children }) {
  return (
    <span className="terminal">{children}</span>
  );
}

Terminal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Terminal;
