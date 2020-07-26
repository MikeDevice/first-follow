import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEraser,
  faHistory,
  faQuestionCircle,
  faRedoAlt,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button';
import './editor-toolbar.scss';

function Toolbar({className}) {
  return (
    <div className={classNames(className, 'editor-toolbar')}>
      <div className="editor-toolbar__section">
        <Button className="editor-toolbar__button">
          <FontAwesomeIcon icon={faUndoAlt} />
        </Button>
        <Button className="editor-toolbar__button">
          <FontAwesomeIcon icon={faRedoAlt} />
        </Button>
        <Button className="editor-toolbar__button">
          <FontAwesomeIcon icon={faEraser} />
        </Button>
      </div>
      <div className="editor-toolbar__section">
        <Button className="editor-toolbar__button">
          <FontAwesomeIcon icon={faHistory} />
        </Button>
        <Button className="editor-toolbar__button">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </Button>
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  className: PropTypes.string,
};

Toolbar.defaultProps = {
  className: null,
};

export default Toolbar;
