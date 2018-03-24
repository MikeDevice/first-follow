import React, { Component } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';

import Nonterminal from '../../textarea-components/Nonterminal';
import Terminal from '../../textarea-components/Terminal';
import Arrow from '../../textarea-components/Arrow';
import Button from './__button';
import * as helpers from './helpers';

const compositeDecorator = new CompositeDecorator([
  {
    strategy: helpers.findNonterminal,
    component: Nonterminal,
  },
  {
    strategy: helpers.findTerminal,
    component: Terminal,
  },
  {
    strategy: helpers.findArrow,
    component: Arrow,
  },
]);

export default class Textarea extends Component {
  state = {
    editorState: EditorState.createEmpty(compositeDecorator),
  }

  componentDidMount() {
    this.editor.focus();
  }

  onChange = (editorState) => {
    const newEditorState = helpers.replaceArrows(editorState);

    this.setState({ editorState: newEditorState });
  }

  onArrowInsert = () => {
    this.insertText(helpers.arrowCode);
  }

  onEpsilonInsert = () => {
    this.insertText('ε');
  }

  insertText(text) {
    const { editorState } = this.state;
    const newEditorState = helpers.insertText(editorState, text);

    this.setState({ editorState: newEditorState }, () => {
      this.editor.focus();
    });
  }

  refEditor = (el) => {
    this.editor = el;
  }

  render() {
    const { editorState } = this.state;
    const lineNumbers = helpers.getLineNumbers(editorState);

    return (
      <div className="textarea">
        <div className="textarea__controls">
          <Button onClick={this.onArrowInsert}>{helpers.arrowCode}</Button>
          <Button onClick={this.onEpsilonInsert}>ε</Button>
        </div>
        <div className="textarea__editor">
          <div className="textarea__numbers">
            {lineNumbers.map(number => (
              <div className="textarea__number" key={number.id}>
                {number.value}
              </div>
            ))}
          </div>
          <div className="textarea__content">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              ref={this.refEditor}
              stripPastedStyles
            />
          </div>
        </div>
      </div>
    );
  }
}
