import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
}

const Button = (props: ButtonProps) => {
  const { children, className, onClick } = props;
  return (
    <button
      type="button"
      className={`${styles.button} ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
