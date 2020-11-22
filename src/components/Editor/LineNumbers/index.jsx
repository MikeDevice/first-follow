import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './editor-line-numbers.scss';

function LineNumbers({numbers, errors}) {
  const errorsHash = _.keyBy(errors, 'ruleNumber');

  return (
    <div className="editor-line-numbers">
      {numbers.map((number, index) => (
        <div
          key={index}
          className={classNames(
            'editor-line-numbers__item',
            errorsHash[number] && 'editor-line-numbers__item_error',
          )}
        >
          {number || <br />}
        </div>
      ))}
    </div>
  );
}

LineNumbers.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    ruleNumber: PropTypes.number.isRequired,
  })).isRequired,
};

export default LineNumbers;
