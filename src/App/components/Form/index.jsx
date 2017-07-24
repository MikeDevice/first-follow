import React, { Component } from 'react';
import Editor from './components/Editor';

import './styles/index.scss';

class Form extends Component {
  submit(event) {
    event.preventDefault();

    console.log('submit');
  }

  render() {
    return (
      <form className="form" onSubmit={this.submit}>
        <div className="form_editor">
          <Editor />
        </div>
        <button type="submit" className="form_button">Run</button>
      </form>
    );
  }
}

export default Form;
