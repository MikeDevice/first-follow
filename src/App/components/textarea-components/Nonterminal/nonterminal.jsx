import React from 'react';
import PropTypes from 'prop-types';

function Nonterminal({ children }) {
  return (
    <span className="nonterminal">{children}</span>
  );
}

Nonterminal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Nonterminal;
