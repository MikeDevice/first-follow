import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import './editor-status-bar.scss';

function StatusBar({errorsCount, success}) {
  return (
    <div className="editor-status-bar">
      {errorsCount > 0 && (
        <div className="editor-status-bar__section editor-status-bar__section_left">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="editor-status-bar__icon editor-status-bar__icon_error"
          />
          <span className="editor-status-bar__label">
            Errors:
            {' '}
            {errorsCount}
          </span>
        </div>
      )}
      {success && (
        <div className="editor-status-bar__section editor-status-bar__section_right">
          <span className="editor-status-bar__label">Success</span>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="editor-status-bar__icon editor-status-bar__icon_success"
          />
        </div>
      )}
    </div>
  );
}

StatusBar.propTypes = {
  errorsCount: PropTypes.number,
  success: PropTypes.bool,
};

StatusBar.defaultProps = {
  errorsCount: 0,
  success: false,
};

export default StatusBar;
