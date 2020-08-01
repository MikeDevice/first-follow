import React, {useState} from 'react';
import {
  Modifier,
  EditorState,
  ContentState,
  SelectionState,
  CompositeDecorator,
} from 'draft-js';

const arrowChar = '\u27f6';

function findWithRegex(regex, text, callback) {
  let matchResult = regex.exec(text);

  while (matchResult) {
    const start = matchResult.index;
    const end = start + matchResult[0].length;

    callback(start, end);

    matchResult = regex.exec(text);
  }
}

function replaceText(editorState, regex, text, startPositionToReplace = 0) {
  const contentState = editorState.getCurrentContent();

  let newEditorState = editorState;
  let newContentState = contentState;

  contentState.getBlockMap().forEach((block) => {
    const blockKey = block.getKey();
    const blockText = block.getText();

    findWithRegex(regex, blockText, (start, end) => {
      let startPosition = start;

      if (startPositionToReplace >= 0) {
        startPosition += startPositionToReplace;
      } else {
        startPosition = end + startPositionToReplace;
      }

      const selection = new SelectionState({
        anchorKey: blockKey,
        focusKey: blockKey,
        anchorOffset: startPosition,
        focusOffset: end,
      });

      newContentState = Modifier.replaceText(newContentState, selection, text);
      const offset = startPosition + text.length;

      newEditorState = EditorState.set(newEditorState, {
        currentContent: newContentState,
        selection: new SelectionState({
          anchorKey: blockKey,
          focusKey: blockKey,
          anchorOffset: offset,
          focusOffset: offset,
          hasFocus: true,
        }),
      });
    });
  });

  return newEditorState;
}

function handleArrowPlaceholder(contentBlock, callback) {
  const regex = new RegExp(`^\\s*[^\\s${arrowChar}]+$`, 'ig');

  const text = contentBlock.getText();
  const matchResult = regex.exec(text);

  if (matchResult) {
    const start = matchResult.index;
    const end = start + matchResult[0].length;

    callback(start, end);
  }
}

function handleArrow(contentBlock, callback) {
  const text = contentBlock.getText();

  findWithRegex(new RegExp(arrowChar, 'g'), text, callback);
}

const ArrowPlaceholder = ({children}) => (
  <span className="editor-content-arrow-placeholder">
    {children}
  </span>
);

const Arrow = ({children}) => (
  <span className="editor-content-arrow">
    {children}
  </span>
);

const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleArrow,
    component: Arrow,
  },
  {
    strategy: handleArrowPlaceholder,
    component: ArrowPlaceholder,
  },
]);

export default (content = '') => {
  const [state, setState] = useState(
    () => EditorState.createWithContent(
      ContentState.createFromText(content),
      compositeDecorator,
    ),
  );

  const onChange = (newState) => {
    const regex = new RegExp(`^\\s*[^\\s${arrowChar}]+\\s$`, 'ig');
    const patchedState = replaceText(newState, regex, `${arrowChar} `, -1);
    setState(patchedState);
  };

  return {state, onChange};
};
