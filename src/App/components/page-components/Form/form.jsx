import React, { Component } from 'react';

import Textarea from '../../form-components/Textarea';

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
        <button type="submit" className="form__button">Run</button>
      </div>
    );
  }
}
