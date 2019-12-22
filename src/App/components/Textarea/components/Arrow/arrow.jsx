import React from 'react';
import PropTypes from 'prop-types';

function Arrow({ children }) {
  return (
    <span className="arrow">{children}</span>
  );
}

Arrow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Arrow;
