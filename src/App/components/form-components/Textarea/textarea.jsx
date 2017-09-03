import React, { Component } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';

import Nonterminal from '../../textarea-components/Nonterminal';
import Terminal from '../../textarea-components/Terminal';
import helpers from './helpers';

export default class Textarea extends Component {
  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: (contentBlock, callback) => {
          helpers.findNonterminal(contentBlock, callback, this.contentHash);
        },
        component: Nonterminal,
      },
      {
        strategy: (contentBlock, callback) => {
          helpers.findTerminal(contentBlock, callback, this.contentHash);
        },
        component: Terminal,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
    };

    this.contentHash = {};
    this.onChange = this.onChange.bind(this);
  }

  onChange(_newEditorState) {
    const { editorState } = this.state;
    const currentContent = editorState.getCurrentContent();
    const newContent = _newEditorState.getCurrentContent();

    let newEditorState = _newEditorState;

    if (currentContent !== newContent) {
      this.contentHash = helpers.getContentHash(newContent);

      // It's need to call 'undo' and 'redo'
      // to call CompositeDecorator's strategies again
      // because it's need to analyze entire text
      // for new terminals and nonterminals
      newEditorState = EditorState.undo(newEditorState);
      newEditorState = EditorState.redo(newEditorState);

      newEditorState = helpers.replaceArrows(newEditorState);
    }

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
