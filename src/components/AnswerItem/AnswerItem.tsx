import React from 'react';
import classNames from 'classnames';
import styles from './AnswerItem.module.css';
import { ReactComponent as ButtonShape } from '../../assets/images/question-item-shape.svg';
import { AnswerStateType } from '../../types/game';

export interface AnswerButtonProps {
  type: `${AnswerStateType}`;
  letter: string;
  text: string;
  className?: string;
  handleClick: (letter: string) => void;
}

const AnswerItem = (props: AnswerButtonProps) => {
  const {
    type, letter, text, className, handleClick,
  } = props;

  const onChooseAnswerItem = () => {
    handleClick(letter);
  };

  const btnCls = classNames({
    [styles.button]: true,
    [className ?? '']: className?.length,
  });

  const btnContainerCls = classNames({
    [styles['button-container']]: true,
    [styles[`button-${type}`]]: type,
  });

  const btnShape = {
    [styles['button-shape']]: true,
    [styles[`button-shape-${type}`]]: type,
  };

  const btnShapeCls = classNames({
    ...btnShape,
  });

  const rightBtnShapeCls = classNames({
    ...btnShape,
    [styles['button-arrow-right']]: true,
  });

  return (
    <button type="button" className={btnCls} onClick={onChooseAnswerItem} title={text}>
      <ButtonShape className={btnShapeCls} />
      <div className={btnContainerCls}>
        <strong className={styles['button-accent-text']}>{letter}</strong>
        <p className={styles['button-text']}>{text}</p>
      </div>
      <ButtonShape className={rightBtnShapeCls} />
    </button>
  );
};

AnswerItem.defaultProps = {
  className: '',
};

export default AnswerItem;
