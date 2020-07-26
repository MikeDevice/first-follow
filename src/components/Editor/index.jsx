import React from 'react';
import './editor.scss';

function Editor() {
  return (
    <div className="editor">
      <div className="editor__toolbar">1</div>
      <div className="editor__content" contentEditable>
        123
      </div>
      <div className="editor__footer">
        <div className="editor__status-bar">
          123
        </div>
        <div>123</div>
      </div>
    </div>
  );
}

export default Editor;
