import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './editor-rows-numbers.scss';

function RowsNumbers({numbers, errors}) {
  const errorsHash = _.keyBy(errors, 'ruleNumber');

  return (
    <div className="editor-rows-numbers">
      {numbers.map((number, index) => (
        <div
          key={index}
          className={classNames(
            'editor-rows-numbers__item',
            errorsHash[number] && 'editor-rows-numbers__item_error',
          )}
        >
          {number || <br />}
        </div>
      ))}
    </div>
  );
}

RowsNumbers.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    ruleNumber: PropTypes.number.isRequired,
  })).isRequired,
};

export default RowsNumbers;
