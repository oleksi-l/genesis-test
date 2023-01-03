import React from 'react';
import styles from './QuestionItem.module.css';
import AnswersList from '../AnswersList/AnswersList';

const data = [
  {
    id: 1,
    letter: 'A',
    text: 'Plain text',
    type: 'inactive',
  },
  {
    id: 1,
    letter: 'A',
    text: 'Plain text',
    type: 'inactive',
  },
  {
    id: 1,
    letter: 'A',
    text: 'Plain text',
    type: 'inactive',
  },
  {
    id: 1,
    letter: 'A',
    text: 'Plain text',
    type: 'inactive',
  },
];

const QuestionItem = () => (
  <div className={styles['question-wrapper']}>
    <div className={styles['question-title-wrapper']}>
      <h1 className={styles['question-title']}>
        How old your elder brother was 10 years before you was born, mate?
      </h1>
    </div>
    <div className={styles['items-wrapper']}>
      <AnswersList options={data} />
    </div>
  </div>
);

export default QuestionItem;
