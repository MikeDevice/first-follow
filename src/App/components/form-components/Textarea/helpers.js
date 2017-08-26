import { EditorState, SelectionState, Modifier } from 'draft-js';

const arrowCode = '\u2192';

function findWithRegex(regex, contentBlock, iteratee) {
  const text = contentBlock.getText();

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
  const regex = /->/g;
  const ranges = [];

  findWithRegex(regex, contentBlock, (start, end) => {
    ranges.push([start, end]);
  });

  return ranges;
}

function findNonterminal(contentBlock, callback) {
  findWithRegex(/^(\s*)[_a-zA-Z]+\w*/g, contentBlock, (start, end, match) => {
    callback(start + match[1].length, end);
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
  replaceArrows,
};
