import React from 'react';
import PropTypes from 'prop-types';

import './styles/index.scss';

function Nonterminal(props) {
  return (
    <span
      className="nonterminal"
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );
}

Nonterminal.propTypes = {
  offsetKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


function strategy(contentBlock, callback) {
  const text = contentBlock.getText();
  console.log(text);
  callback(0, 1);
}

export default Nonterminal;
export { strategy };
