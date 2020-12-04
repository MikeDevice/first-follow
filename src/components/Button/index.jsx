import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

function Button({className, ...props}) {
  return (
    <button
      type="button"
      className={classNames(className, 'button')}
      {...props}
    />
  );
}

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: null,
};

export default Button;
