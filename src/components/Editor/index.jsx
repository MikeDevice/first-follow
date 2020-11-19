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

function getLineNumbers(lines) {
  const numbers = [];
  let counter = 1;

  lines.forEach((line) => {
    if (line) {
      numbers.push(counter);
      counter += 1;
    } else {
      numbers.push(null);
    }
  });

  return numbers;
}

function Editor({onSubmit}) {
  const {state, onChange, undo, redo, clear} = useEditor(defaultContent);

  const onRunClick = () => {
    const text = state.getCurrentContent().getPlainText();

    onSubmit(text);
  };

  const lines = getLineNumbers(
    state
      .getCurrentContent()
      .getPlainText()
      .split('\n'),
  );

  return (
    <div className="editor">
      <Toolbar onUndoClick={undo} onRedoClick={redo} onClearClick={clear} />
      <div className="editor__content">
        <div className="editor__line-numbers">
          {lines.map((number, index) => number
            ? <div key={index}>{number}</div>
            : <br key={index} />)}
        </div>
        <div className="editor__body">
          <ContentEditor
            state={state}
            onChange={onChange}
          />
        </div>
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
