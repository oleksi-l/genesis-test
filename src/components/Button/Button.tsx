import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: string
  className?: string
}

const Button = (props: ButtonProps) => {
  const { children, className } = props;
  return <button type="button" className={`${styles.button} ${className ?? ''}`}>{children}</button>;
};

Button.defaultProps = {
  className: '',
};

export default Button;
