import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEraser,
  // faHistory,
  // faQuestionCircle,
  faRedoAlt,
  faUndoAlt,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button';
import './editor-toolbar.scss';

function Toolbar({onUndoClick, onRedoClick, onClearClick}) {
  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar__section">
        <Button className="editor-toolbar__button" onClick={onUndoClick}>
          <FontAwesomeIcon icon={faUndoAlt} />
        </Button>
        <Button className="editor-toolbar__button" onClick={onRedoClick}>
          <FontAwesomeIcon icon={faRedoAlt} />
        </Button>
        <Button className="editor-toolbar__button" onClick={onClearClick}>
          <FontAwesomeIcon icon={faEraser} />
        </Button>
      </div>
      {/* <div className="editor-toolbar__section">
        <Button className="editor-toolbar__button">
          <FontAwesomeIcon icon={faHistory} />
        </Button>
        <Button className="editor-toolbar__button">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </Button>
      </div> */}
    </div>
  );
}

Toolbar.propTypes = {
  onUndoClick: PropTypes.func.isRequired,
  onRedoClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
};

export default Toolbar;
