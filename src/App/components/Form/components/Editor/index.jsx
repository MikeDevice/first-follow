import React, { Component } from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';

import Nonterminal, { strategy as nonterminalStrategy } from './components/Nonterminal';

// eslint-disable-next-line
import 'node_modules/draft-js/dist/Draft.css';
import './styles/index.scss';

export default class FormEditor extends Component {
  constructor(props) {
    super(props);

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: nonterminalStrategy,
        component: Nonterminal,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator),
    };

    this.onChange = editorState => this.setState({ editorState });
  }

  render() {
    return (
      <div className="editor">
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

function handleStrategy(contentBlock, callback) {
  const text = contentBlock.getText();
  const regex = /->/g;

  let match = regex.exec(text);
  let start;

  while (match !== null) {
    start = match.index;
    callback(start, start + match[0].length);

    match = regex.exec(text);
  }
}
