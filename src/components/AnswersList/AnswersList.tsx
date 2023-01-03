import React from 'react';
import styles from './AnswersList.module.css';
import AnswerItem from '../AnswerItem/AnswerItem';

export type AnswerItemProps = {
  id: number,
  text: string,
  letter: string
  type: string
};

type AnswerListProps = {
  options: AnswerItemProps[]
};

const AnswersList = ({ options }: AnswerListProps) => (
  <div className={styles['list-wrapper']}>
    {options.map((item) => (
      <AnswerItem
        key={item.id}
        type="inactive"
        letter={item.letter}
        text={item.text}
        className={styles['list-item']}
      />
    ))}
  </div>
);

export default AnswersList;
