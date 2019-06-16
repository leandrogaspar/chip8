import React from 'react';
import './Button.css';

const Button = props => (
  <div
    role="button"
    aria-label={props.children}
    className="Button"
    onClick={props.onClick}
    onMouseUp={props.onMouseUp}
    onMouseDown={props.onMouseDown}
    tabIndex="0"
  >
    {props.children}
  </div>
);

export default Button;
