import React from 'react';
import Button from '../../Button';

function TextareaButton(props) {
  return (
    <Button
      className="textarea__button"
      tabIndex="-1"
      {...props}
    />
  );
}

export default TextareaButton;
