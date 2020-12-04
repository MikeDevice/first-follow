import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './editor-rows-numbers.scss';

function RowsNumbers({rows, errors}) {
  const errorsHash = _.keyBy(errors, 'number');
  let rowNumber = 0;

  return (
    <div className="editor-rows-numbers">
      {rows.map((row, index) => {
        rowNumber = row ? rowNumber + 1 : rowNumber;

        return (
          <Item
            key={index}
            {...row && {
              number: rowNumber,
              error: errorsHash[rowNumber] && errorsHash[rowNumber].error,
            }}
          />
        );
      })}
    </div>
  );
}

RowsNumbers.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
  })).isRequired,
};

export default RowsNumbers;
