import React from 'react';
import './switcher.scss';

function Switcher(props) {
  return (
    <label className="switcher">
      <input type="checkbox" className="switcher__checkbox" />
      <span className="switcher__control">
        <span className="switcher__indicator" />
      </span>
      <span className="switcher__text">Hide empty columns</span>
    </label>
  );
}

export default Switcher;
