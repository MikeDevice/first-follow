import _ from 'lodash-es';
import {useState} from 'react';
import {
  Modifier,
  EditorState,
  ContentState,
  SelectionState,
  CompositeDecorator,
} from 'draft-js';
import decorators from './decorators';
import {findWithRegex} from './helpers';
import {chars, regexesContent} from './constants';

function replaceText({editorState, searchRegex, text, startPosition = 0}) {
  const contentState = editorState.getCurrentContent();
  console.log(contentState.getPlainText());
  let newEditorState = editorState;
  let newContentState = contentState;

  contentState.getBlockMap().forEach((block) => {
    const blockKey = block.getKey();
    const blockText = block.getText();

    findWithRegex(searchRegex, blockText, (start, end) => {
      if (startPosition >= 0) {
        start += startPosition;
      } else {
        start = end + startPosition;
      }

      const selection = new SelectionState({
        anchorKey: blockKey,
        focusKey: blockKey,
        anchorOffset: start,
        focusOffset: end,
      });

      newContentState = Modifier.replaceText(newContentState, selection, text);
      const offset = start + text.length;

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

function insertArrows(editorState) {
  return replaceText({
    searchRegex: new RegExp(`^${regexesContent.startOfRule}\\s`, 'ig'),
    text: `${chars.arrow} `,
    startPosition: -1,
    editorState,
  });
}

function removeArrows(editorState) {
  return replaceText({
    searchRegex: new RegExp(`${chars.arrow}`, 'g'),
    text: ' ',
    editorState,
  });
}

function removeExtraArrowsSpaces(editorState) {
  return replaceText({
    searchRegex: new RegExp(`^${regexesContent.startOfRule}\\s*${chars.arrow}$`, 'ig'),
    text: '',
    startPosition: -1,
    editorState,
  });
}

export default (content = '') => {
  const contentState = ContentState.createFromText(content);
  const compositeDecorator = new CompositeDecorator([
    decorators.arrow,
    decorators.arrowPlaceholder,
  ]);

  const [state, setState] = useState(
    () => EditorState.createWithContent(contentState, compositeDecorator),
  );

  const changeState = _.flowRight([
    insertArrows,
    removeExtraArrowsSpaces,
    removeArrows,
  ]);

  const onChange = (editorState) => {
    console.log('onchange');
    setState(changeState(editorState));
  };

  return {state, onChange};
};
