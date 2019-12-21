import React from 'react';
import PropTypes from 'prop-types';

function ErrorLabel({ errors }) {
  const errorsStr = errors.map((number) => `#${number}`).join(', ');

  return (
    <div className="error-label">
      Errors in rules: {errorsStr}
    </div>
  );
}

ErrorLabel.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ErrorLabel;
