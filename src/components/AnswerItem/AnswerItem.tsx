import React from 'react';
import styles from './AnswerItem.module.css';
import { ReactComponent as ButtonShape } from '../../assets/images/question-item-shape.svg';

enum AnswerStateType {
  INACTIVE = 'inactive',
  SELECTED = 'selected',
  CORRECT = 'correct',
  ERROR = 'error',
}

export interface AnswerButtonProps {
  type: `${AnswerStateType}`;
  letter: string;
  text: string;
  className?: string;
}

const AnswerItem = (props: AnswerButtonProps) => {
  const {
    type, letter, text, className,
  } = props;
  return (
    <button type="button" className={`${styles.button} ${className ?? ''}`}>
      <ButtonShape className={styles['button-shape']} />
      <div
        className={`${styles['button-container']} ${styles[`button-${type}`]}`}
      >
        <strong className={styles['button-accent-text']}>{letter}</strong>
        <p className={styles['button-text']}>{text}</p>
      </div>
      <ButtonShape
        className={`${styles['button-arrow-right']} ${styles['button-shape']}`}
      />
    </button>
  );
};

AnswerItem.defaultProps = {
  className: '',
};

export default AnswerItem;
