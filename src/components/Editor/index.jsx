import React from 'react';
import Button from '../Button';
import ContentEditor from './ContentEditor';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import useEditor from './useEditor';
import './editor.scss';

const defaultContent = [
  '',
].join(' ');

function Editor() {
  const {state, onChange, undo, redo, clear} = useEditor(defaultContent);

  return (
    <div className="editor">
      <Toolbar onUndoClick={undo} onRedoClick={redo} onClearClick={clear} />
      <div className="editor__content">
        <ContentEditor
          state={state}
          onChange={onChange}
        />
      </div>
      <div className="editor__footer">
        <StatusBar />
        <Button className="editor__button">Run</Button>
      </div>
    </div>
  );
}

export default Editor;
