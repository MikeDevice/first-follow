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
  onTextChange = (/* text */) => {}

  submit = () => {
    console.log('submit');
  }

  render() {
    return (
      <div className="form">
        <div className="form__editor">
          <Textarea
            onChange={this.onTextChange}
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
