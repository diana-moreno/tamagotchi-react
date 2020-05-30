import React from 'react';
import { func, string } from 'prop-types';

const Button = ({ onclick, text }) => (
  <button onClick={onclick}>{ text }</button>
);

Button.propTypes = {
  text: string.isRequired,
  onclick: func,
};
Button.defaultProps = {
  onclick: () => {},
};

export default Button;
