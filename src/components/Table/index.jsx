import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './table.scss';

function Table({data, columns}) {
  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          <th className="table__cell" aria-label="top left empty cell" />
          {columns.map((name, index) => (
            <th className="table__cell" key={index}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {_.map(data, (values, name) => {
          const valuesHash = _.keyBy(values);

          return (
            <tr className="table__row" key={name}>
              <td className="table__cell">{name}</td>
              {columns.map((columnName, columnIndex) => {
                const hasValue = valuesHash[columnName];
                const className = classNames('table__cell', {
                  table__cell_success: hasValue,
                  table__cell_error: !hasValue,
                });

                return (
                  <td key={columnIndex} className={className}>
                    {hasValue ? '+' : '-'}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Table;
