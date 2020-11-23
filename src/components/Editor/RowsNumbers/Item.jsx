import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Item({number, error}) {
  return (
    <div
      className={classNames(
        'editor-rows-numbers__item',
        error && 'editor-rows-numbers__item_error',
      )}
    >
      {number || <br />}
    </div>
  );
}

Item.propTypes = {
  number: PropTypes.number,
  error: PropTypes.string,
};

Item.defaultProps = {
  number: null,
  error: null,
};

export default Item;
