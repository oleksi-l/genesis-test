import React from 'react';
import classNames from 'classnames';
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
  const btnCls = classNames({
    [styles.button]: true,
    [className ?? '']: className?.length,
  });
  const btnContainerCls = classNames({
    [styles['button-container']]: true,
    [styles[`button-${type}`]]: type,
  });
  const btnShapeCls = classNames({
    [styles['button-arrow-right']]: true,
    [styles['button-shape']]: true,
  });

  return (
    <button type="button" className={btnCls}>
      <ButtonShape className={styles['button-shape']} />
      <div className={btnContainerCls}>
        <strong className={styles['button-accent-text']}>{letter}</strong>
        <p className={styles['button-text']}>{text}</p>
      </div>
      <ButtonShape className={btnShapeCls} />
    </button>
  );
};

AnswerItem.defaultProps = {
  className: '',
};

export default AnswerItem;
