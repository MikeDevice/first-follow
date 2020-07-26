import React from 'react';
import Button from '../Button';
import Content from './Content';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import './editor.scss';

function Editor() {
  return (
    <div className="editor">
      <Toolbar />
      <div className="editor__content">
        <Content />
      </div>
      <div className="editor__footer">
        <StatusBar />
        <Button className="editor__button">Run</Button>
      </div>
    </div>
  );
}

export default Editor;
