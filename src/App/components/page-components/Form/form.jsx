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

  submit = (event) => {
    event.preventDefault();

    console.log('submit');
  }

  render() {
    const { text } = this.state;

    return (
      <div className="form">
        <div className="form__editor">
          <Textarea value={text} />
        </div>
        <Button className="form__button">Run</Button>
      </div>
    );
  }
}
