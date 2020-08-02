import React from 'react';
import {Editor} from 'draft-js';
import useEditor from './useEditor';
import 'draft-js/dist/Draft.css';
import './editor-content.scss';

const content = [
  'Aasdasdasd⟶Basdas',
].join(' ');

function Content() {
  const {state, onChange} = useEditor(content);

  return (
    <div className="editor-content">
      <Editor
        editorState={state}
        onChange={onChange}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        stripPastedStyles
      />
    </div>
  );
}

export default Content;
