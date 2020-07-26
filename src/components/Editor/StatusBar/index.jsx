import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import './editor-status-bar.scss';

function StatusBar({className}) {
  return (
    <div className={classNames(className, 'editor-status-bar')}>
      <div className="editor-status-bar__section">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="editor-status-bar__icon editor-status-bar__icon_error"
        />
        <span className="editor-status-bar__label">Errors: 1</span>
      </div>
      <div className="editor-status-bar__section">
        <span className="editor-status-bar__label">Success</span>
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="editor-status-bar__icon editor-status-bar__icon_success"
        />
      </div>
    </div>
  );
}

StatusBar.propTypes = {
  className: PropTypes.string,
};

StatusBar.defaultProps = {
  className: null,
};

export default StatusBar;
