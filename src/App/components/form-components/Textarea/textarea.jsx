import React, { Component } from 'react';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';
import PropTypes from 'prop-types';

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
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
  }

  static defaultProps = {
    defaultValue: '',
  }

  state = {
    editorState: EditorState.moveSelectionToEnd(EditorState.createWithContent(
      ContentState.createFromText(this.props.defaultValue),
      compositeDecorator,
    )),
  }

  componentDidMount() {
    this.editor.focus();
  }

  onChange = (editorState) => {
    const newEditorState = helpers.replaceArrows(editorState);
    const text = newEditorState.getCurrentContent().getPlainText();

    this.setState({ editorState: newEditorState });
    this.props.onChange(text);
  }

  onArrowInsert = () => {
    this.insertText(helpers.arrowCode);
  }

  onEpsilonInsert = () => {
    this.insertText(helpers.epsilon);
  }

  onClear = () => {
    const { editorState } = this.state;
    const newEditorState = EditorState.push(
      editorState,
      ContentState.createFromText(''),
      'remove-range',
    );

    this.setState({ editorState: newEditorState }, () => {
      this.editor.focus();
    });
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
          <div className="textarea__controls-block">
            <Button title="Insert arrow" onClick={this.onArrowInsert}>
              {helpers.arrowCode}
            </Button>
            <Button title="Insert epsilon" onClick={this.onEpsilonInsert}>
              {helpers.epsilon}
            </Button>
          </div>
          <div className="textarea__controls-block">
            <Button title="Clear" onClick={this.onClear}>
              &#10680;
            </Button>
          </div>
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
              editorState={editorState}
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
