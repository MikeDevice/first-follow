import React, { Component } from 'react';

import Textarea from '../../form-components/Textarea';
import Button from '../../common-components/Button';

export default class Form extends Component {
  submit = (event) => {
    event.preventDefault();

    console.log('submit');
  }

  render() {
    return (
      <div className="form">
        <div className="form__editor">
          <Textarea />
        </div>
        <Button className="form__button">Run</Button>
      </div>
    );
  }
}
