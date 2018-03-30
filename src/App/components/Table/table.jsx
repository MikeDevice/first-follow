import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */

function Table({ titles, rows }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {titles.map((title, index) => <th key={index}>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => <td key={colIndex}>{col}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Table;
