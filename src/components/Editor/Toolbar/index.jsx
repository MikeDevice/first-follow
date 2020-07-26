import React from 'react';
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

function Toolbar() {
  return (
    <div className="editor-toolbar">
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

export default Toolbar;
