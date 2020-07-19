import React from 'react';
import classNames from 'classnames';
import './table.scss';

function Table({data, columnsNames}) {
  const rows = Object.entries(data);

  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          <th className="table__cell" aria-label="top left empty cell" />
          {columnsNames.map((name, index) => (
            <th className="table__cell" key={index}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {rows.map(([name, values]) => {
          const columns = columnsNames.map((columnName, index) => (
            <td
              key={index}
              className={classNames('table__cell', {
                table__cell_success: values.includes(columnName),
                table__cell_error: !values.includes(columnName),
              })}
            >
              {values.includes(columnName) ? '+' : '-'}
            </td>
          ));

          return (
            <tr className="table__row">
              <td className="table__cell">{name}</td>
              {columns}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
