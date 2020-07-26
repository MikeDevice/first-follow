import React, {useState} from 'react';
import {ContentState, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './editor-content.scss';

const defaultContent = 'Program -> a';

function Content() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(ContentState.createFromText(defaultContent)),
  );

  return (
    <div className="editor-content">
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        stripPastedStyles
      />
    </div>
  );
}

export default Content;
