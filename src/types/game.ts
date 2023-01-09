export interface AnswerItem {
  letter: string;
  answer: string;
  type?: `${AnswerStateType}`;
}

export interface QuestionItem {
  id: number;
  question: string;
  answers: AnswerItem[];
  correctAnswer: string[];
  price: string;
}

export interface PriceItem {
  id: number;
  value: string;
  status?: `${PriceItemType}`;
}

export interface GameConfig {
  questions: QuestionItem[];
  prices: PriceItem[];
}

export enum AnswerStateType {
  INACTIVE = 'inactive',
  SELECTED = 'selected',
  CORRECT = 'correct',
  ERROR = 'error',
}

export enum PriceItemType {
  INACTIVE = 'inactive',
  SELECTED = 'selected',
  COMPLETED = 'completed',
}
