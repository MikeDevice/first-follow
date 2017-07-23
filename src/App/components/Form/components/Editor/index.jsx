import React, { Component } from 'react';

export default class Editor extends Component {
  render() {
    return (
      <textarea
        className={this.props.className}
      />
    );
  }
}

Editor.propTypes = {
  className: React.PropTypes.string,
};

Editor.defaultProps = {
  className: '',
};
