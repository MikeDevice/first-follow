import React, { Component } from 'react';

import Textarea from '../../form-components/Textarea';
import Button from '../../common-components/Button';

const defaultText = [
  'Program→var Variables begin Operators end',
  'Variables→Variable , Variables',
  'Variables→ε',
  'Operators→ε',
].join('\n');

export default class Form extends Component {
  state = {
    text: defaultText,
  }

  onTextChange = (text) => {
    this.setState({ text });
  }

  submit = () => {
    const { text } = this.state;

    console.log('submit', text);
  }

  render() {
    return (
      <div className="form">
        <div className="form__editor">
          <Textarea
            onChange={this.onTextChange}
            onRequestSubmit={this.submit}
            defaultValue={defaultText}
          />
        </div>
        <Button
          className="form__button"
          onClick={this.submit}
        >
          Run
        </Button>
      </div>
    );
  }
}
