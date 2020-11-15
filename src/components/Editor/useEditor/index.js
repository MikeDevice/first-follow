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

function replaceText({contentState, searchRegex, text, startPosition = 0}) {
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
    });
  });

  return newContentState;
}

function insertArrows(contentState) {
  return replaceText({
    searchRegex: new RegExp(`^${regexesContent.startOfRule}\\s`, 'ig'),
    text: `${chars.arrow}`,
    startPosition: -1,
    contentState,
  });
}

function removeArrows(contentState) {
  return replaceText({
    searchRegex: new RegExp(`${chars.arrow}`, 'g'),
    text: ' ',
    contentState,
  });
}

function removeEmptyChains(contentState) {
  return replaceText({
    searchRegex: new RegExp(`${chars.emptyChain}`, 'g'),
    text: ' ',
    contentState,
  });
}

export default (content = '') => {
  const contentState = ContentState.createFromText(content);
  const compositeDecorator = new CompositeDecorator([
    decorators.arrowPlaceholder,
    decorators.emptyChainPlaceholder,
    decorators.arrow,
  ]);

  const [state, setState] = useState(
    () => EditorState.createWithContent(contentState, compositeDecorator),
  );

  const modifyContentState = _.flow(
    removeArrows,
    removeEmptyChains,
    insertArrows,
  );

  const onChange = (editorState) => {
    const currentContent = modifyContentState(editorState.getCurrentContent());
    const newEditorState = EditorState.set(editorState, {currentContent});

    setState(newEditorState);
  };

  const undo = () => {
    setState(EditorState.undo(state));
  };

  const redo = () => {
    setState(EditorState.redo(state));
  };

  const clear = () => {
    setState(EditorState.push(state, ContentState.createFromText('')));
  };

  return {state, onChange, undo, redo, clear};
};
