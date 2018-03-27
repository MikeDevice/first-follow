import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Textarea from '../../form-components/Textarea';
import Button from '../../common-components/Button';

const defaultText = [
  'Program→var Variables begin Operators end',
  'Variables→Variable , Variables',
  'Variables→ε',
  'Operators→ε',
].join('\n');

export default class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    text: defaultText,
  }

  onTextChange = (text) => {
    this.setState({ text });
  }

  parseText = (text) => {
    const regex = /^([A-Z]+\w*)\s*→\s*(ε|[^ε]+)$/;

    return text.split('\n')
      .filter(str => str.length)
      .map((row) => {
        const match = row.trim().match(regex);

        if (!match || !match[1] || !match[2]) return null;

        return {
          left: match[1],
          right: match[2].split(/\s+/),
        };
      });
  }

  submit = () => {
    const { text } = this.state;

    this.props.onSubmit(this.parseText(text));
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
