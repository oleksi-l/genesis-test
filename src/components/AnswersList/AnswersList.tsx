import React from 'react';
import styles from './AnswersList.module.css';
import AnswerItem from '../AnswerItem/AnswerItem';
import { AnswerStateType, AnswerItem as AnswerItemType } from '../../types/game';

type AnswerListProps = {
  options: AnswerItemType[];
  chooseAnswer: (letter: string) => void;
};

const AnswersList = ({ options, chooseAnswer }: AnswerListProps) => (
  <div className={styles['list-wrapper']}>
    {options.map((item) => (
      <AnswerItem
        key={item.letter}
        type={item.type ?? AnswerStateType.INACTIVE}
        letter={item.letter}
        text={item.answer}
        className={styles['list-item']}
        handleClick={chooseAnswer}
      />
    ))}
  </div>
);

export default AnswersList;
