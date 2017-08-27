import React, { Component } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';

import Nonterminal from '../../textarea-components/Nonterminal';
import Terminal from '../../textarea-components/Terminal';
import { findNonterminal, findTerminal, replaceArrows } from './helpers';

export default class Textarea extends Component {
  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: findNonterminal,
        component: Nonterminal,
      },
      {
        strategy: findTerminal,
        component: Terminal,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    const newEditorState = replaceArrows(editorState);

    this.setState({ editorState: newEditorState });
  }

  render() {
    return (
      <div className="textarea">
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="Start typing your grammar..."
          stripPastedStyles
        />
      </div>
    );
  }
}
