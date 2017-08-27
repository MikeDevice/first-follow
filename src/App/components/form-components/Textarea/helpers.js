import { EditorState, SelectionState, Modifier } from 'draft-js';

const arrowCode = '\u2192';

function findWithRegex(regex, text, iteratee) {
  let match = regex.exec(text);
  let start;
  let end;

  while (match !== null) {
    start = match.index;
    end = start + match[0].length;

    iteratee(start, end, match);

    match = regex.exec(text);
  }
}

function findArrowRanges(contentBlock) {
  const text = contentBlock.getText();
  const regex = /->/g;
  const ranges = [];

  findWithRegex(regex, text, (start, end) => {
    ranges.push([start, end]);
  });

  return ranges;
}

function findNonterminal(contentBlock, callback) {
  const text = contentBlock.getText();

  findWithRegex(/^(\s*)[_a-zA-Z]+\w*/g, text, (start, end, match) => {
    callback(start + match[1].length, end);
  });
}

function findTerminal(contentBlock, callback) {
  const text = contentBlock.getText();
  const arrowIndex = text.indexOf(arrowCode);

  if (arrowIndex === -1) return;

  findWithRegex(/\S+/g, text.slice(arrowIndex + 1), (start, end) => {
    callback(arrowIndex + start + 1, arrowIndex + end + 1);
  });
}

function replaceArrows(editorState) {
  const contentState = editorState.getCurrentContent();

  let newEditorState = editorState;
  let newContentState = contentState;

  contentState.getBlockMap().forEach((block) => {
    const blockKey = block.getKey();
    const ranges = findArrowRanges(block);

    ranges.forEach(([start, end]) => {
      const arrowSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: start,
        focusKey: blockKey,
        focusOffset: end,
      });

      newContentState = Modifier.replaceText(
        newContentState,
        arrowSelection,
        arrowCode,
      );

      const offset = start + arrowCode.length;

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

export {
  findNonterminal,
  findTerminal,
  replaceArrows,
};
