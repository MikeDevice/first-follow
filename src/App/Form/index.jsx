import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './form.scss';
import './input.scss';
import './button.scss';

const defaultValue = [
  'S -> a b A',
  'A -> b c',
  'A -> ε',
].join('\n');

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { value: defaultValue };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  submit(event) {
    event.preventDefault();

    this.props.onSuccessSubmit(this.state.value);
  }

  render() {
    return (
      <form className="form" onSubmit={this.submit}>
        <textarea
          className="input"
          value={this.state.value}
          onChange={this.onChange}
        />
        <button type="submit" className="button">Run</button>
      </form>
    );
  }
}

Form.propTypes = {
  onSuccessSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSuccessSubmit: () => {},
};

export default Form;
