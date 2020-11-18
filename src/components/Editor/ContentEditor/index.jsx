import React from 'react';
import PropTypes from 'prop-types';
import {Editor} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './editor-content-editor.scss';

function ContentEditor({state, onChange}) {
  return (
    <div className="editor-content-editor">
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

ContentEditor.propTypes = {
  state: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContentEditor;
