import React from 'react';
import styles from './QuestionItem.module.css';
import AnswersList from '../AnswersList/AnswersList';
import { QuestionItem as QuestionItemType } from '../../types/game';

interface QuestionItemProps {
  question: QuestionItemType;
  chooseAnswer: (answer: string) => void;
}

const QuestionItem = ({ question, chooseAnswer }: QuestionItemProps) => (
  <div className={styles['question-wrapper']}>
    <div className={styles['question-title-wrapper']}>
      <h1 className={styles['question-title']}>{question.question}</h1>
    </div>
    <div className={styles['items-wrapper']}>
      <AnswersList
        options={question.answers ?? []}
        chooseAnswer={chooseAnswer}
      />
    </div>
  </div>
);

export default QuestionItem;
