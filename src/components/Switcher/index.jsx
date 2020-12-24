import React from 'react';
import PropTypes from 'prop-types';
import './switcher.scss';

function Switcher({isChecked}) {
  return (
    <label className="switcher">
      <input type="checkbox" className="switcher__checkbox" checked={isChecked} />
      <span className="switcher__control">
        <span className="switcher__indicator" />
      </span>
      <span className="switcher__text">Hide empty columns</span>
    </label>
  );
}

Switcher.propTypes = {
  isChecked: PropTypes.bool.isRequired,
};

export default Switcher;
