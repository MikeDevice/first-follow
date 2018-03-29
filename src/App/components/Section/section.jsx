import React from 'react';
import PropTypes from 'prop-types';

function Section({ title, children }) {
  return (
    <div className="section">
      <h2 className="section__title">{title}</h2>
      <div className="section__body">{children}</div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
