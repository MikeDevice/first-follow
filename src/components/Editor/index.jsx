import React from 'react';
import Button from '../Button';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import './editor.scss';

function Editor() {
  return (
    <div className="editor">
      <Toolbar className="editor__toolbar" />
      <div className="editor__content">
        123
      </div>
      <div className="editor__footer">
        <StatusBar className="editor__status-bar" />
        <Button className="editor__button">Run</Button>
      </div>
    </div>
  );
}

export default Editor;
