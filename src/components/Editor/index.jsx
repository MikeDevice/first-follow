import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ContentEditor from './ContentEditor';
import StatusBar from './StatusBar';
import Toolbar from './Toolbar';
import useEditor from './useEditor';
import './editor.scss';

const defaultContent = [
  'A',
].join('\n');

function Editor({onSubmit}) {
  const {state, onChange, undo, redo, clear} = useEditor(defaultContent);

  const onRunClick = () => {
    const text = state.getCurrentContent().getPlainText();

    onSubmit(text);
  };

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
        <Button className="editor__button" onClick={onRunClick}>Run</Button>
      </div>
    </div>
  );
}

Editor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Editor;
