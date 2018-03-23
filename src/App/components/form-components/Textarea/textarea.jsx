import React, { Component } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';

import Nonterminal from '../../textarea-components/Nonterminal';
import Terminal from '../../textarea-components/Terminal';
import Arrow from '../../textarea-components/Arrow';
import { findNonterminal, findTerminal, findArrow, replaceArrows } from './helpers';

const compositeDecorator = new CompositeDecorator([
  {
    strategy: findNonterminal,
    component: Nonterminal,
  },
  {
    strategy: findTerminal,
    component: Terminal,
  },
  {
    strategy: findArrow,
    component: Arrow,
  },
]);

export default class Textarea extends Component {
  state = {
    editorState: EditorState.createEmpty(compositeDecorator),
  }

  onChange = (editorState) => {
    const newEditorState = replaceArrows(editorState);

    this.setState({ editorState: newEditorState });
  }

  getLineNumbers() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const numbers = [];
    let rulesNumber = 0;

    contentState.getBlockMap().forEach((block) => {
      const isEmpty = !block.getText().length;
      let char;

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

  render() {
    const lineNumbers = this.getLineNumbers();

    return (
      <div className="textarea">
        <div className="textarea__numbers">
          {lineNumbers.map(number => (
            <div className="textarea__number" key={number.id}>
              {number.value || '\u00A0'}
            </div>
          ))}
        </div>
        <div className="textarea__editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Start typing your grammar..."
            stripPastedStyles
          />
        </div>
      </div>
    );
  }
}
