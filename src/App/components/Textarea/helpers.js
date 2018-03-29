import { EditorState, SelectionState, Modifier } from 'draft-js';
import { arrow, epsilon } from '../../constants';

function findWithRegex(regex, text, callback) {
  let match = regex.exec(text);

  while (match !== null) {
    const start = match.index;
    const end = start + match[0].length;

    callback(start, end, match);

    match = regex.exec(text);
  }
}

function findArrowRanges(contentBlock, callback) {
  const text = contentBlock.getText();
  const regex = /->/g;

  findWithRegex(regex, text, callback);
}

function findNonterminal(contentBlock, callback) {
  const text = contentBlock.getText();
  const regex = new RegExp(`(^|${arrow}|\\s+)([A-Z]+\\w*)`, 'g');

  findWithRegex(regex, text, (start, end, match) => {
    callback(start + match[1].length, end, match[2]);
  });
}

function findTerminal(contentBlock, callback) {
  const text = contentBlock.getText();
  const arrowIndex = text.indexOf(arrow);

  if (arrowIndex === -1) return;

  const regex = new RegExp(`(^|\\s+)(?![A-Z])([^\\s${epsilon}]+)`, 'g');

  findWithRegex(regex, text.slice(arrowIndex + 1), (start, end, match) => {
    callback(
      arrowIndex + match[1].length + start + 1,
      arrowIndex + end + 1, match[2],
    );
  });
}

function findArrow(contentBlock, callback) {
  const text = contentBlock.getText();
  const regex = new RegExp(`${arrow}`, 'g');

  findWithRegex(regex, text, callback);
}

function replaceArrows(editorState) {
  const contentState = editorState.getCurrentContent();

  let newEditorState = editorState;
  let newContentState = contentState;

  contentState.getBlockMap().forEach((block) => {
    const blockKey = block.getKey();

    findArrowRanges(block, (start, end) => {
      const arrowSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: start,
        focusKey: blockKey,
        focusOffset: end,
      });

      newContentState = Modifier.replaceText(
        newContentState,
        arrowSelection,
        arrow,
      );

      const offset = start + arrow.length;

      newEditorState = EditorState.set(newEditorState, {
        currentContent: newContentState,
        selection: new SelectionState({
          anchorKey: blockKey,
          anchorOffset: offset,
          focusKey: blockKey,
          focusOffset: offset,
          hasFocus: true,
        }),
      });
    });
  });

  return newEditorState;
}

function insertText(editorState, text) {
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  const newContentState = Modifier.replaceText(
    currentContent,
    selection,
    text,
  );

  return EditorState.push(editorState, newContentState, 'insert-characters');
}

function getLineNumbers(editorState) {
  const contentState = editorState.getCurrentContent();
  const numbers = [];
  let rulesNumber = 0;

  contentState.getBlockMap().forEach((block) => {
    const isEmpty = !block.getText().length;
    let char = '\u00A0';

    if (!isEmpty) {
      rulesNumber += 1;
      char = rulesNumber;
    }

    numbers.push({
      id: block.getKey(),
      value: char,
    });
  });

  return numbers;
}

export {
  findArrow,
  findNonterminal,
  findTerminal,
  getLineNumbers,
  insertText,
  replaceArrows,
};
