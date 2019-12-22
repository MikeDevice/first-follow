import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function Button({ className, ...props }) {
  return (
    <button
      type="button"
      className={classNames('button', className)}
      {...props}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
