import React from 'react';
import './Button.css'; // Include a CSS file for button styles (optional)

const Button = ({ text, onClick, type = 'primary', className = '', disabled = false }) => {
  // Based on the type, apply different styles
  const buttonClass = `button ${type} ${className} ${disabled ? 'disabled' : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
