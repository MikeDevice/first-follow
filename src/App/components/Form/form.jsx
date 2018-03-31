import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { arrow, epsilon } from '../../constants';
import Textarea from '../Textarea';
import Button from '../Button';

const defaultText = [
  `S${arrow}a b A`,
  `A${arrow}b c`,
  `A${arrow}${epsilon}`,
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
    const regex = new RegExp(`^([A-Z]+\\w*)\\s*${arrow}\\s*(${epsilon}|[^${epsilon}]+)$`);

    return text.split('\n')
      .map(str => str.trim())
      .filter(str => str.length)
      .map((row) => {
        const match = row.match(regex);

        if (!match || !match[1] || !match[2]) return null;

        return {
          left: match[1],
          right: match[2] === epsilon ? [null] : match[2].split(/\s+/),
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
          Calculate
        </Button>
      </div>
    );
  }
}
