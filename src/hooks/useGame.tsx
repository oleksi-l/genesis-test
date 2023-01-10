import { useState, useEffect, useMemo } from 'react';
import { MIN_AMOUNT, ZERO_AMOUNT, MAX_AMOUNT } from '../constants/amounts';
import {
  GameConfig, QuestionItem, PriceItem, PriceItemType, AnswerStateType,
} from '../types/game';
import config from '../constants/config.json';
import createIndexedMap from '../utils/index';

interface UpdatePriceItem {
  value: string;
  status: `${PriceItemType}`;
}

const checkIsAnswerValid = (
  correctAnswers: string[],
  currentAnswer: string,
) => correctAnswers.includes(currentAnswer);

const useGame = (gameConfig: GameConfig) => {
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState<Map<number, QuestionItem> | null>(null);
  const [prices, setPrices] = useState<PriceItem[] | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(gameConfig.questions[0].id);

  useEffect(() => {
    if (gameConfig) {
      setQuestions(createIndexedMap(gameConfig.questions));
      setPrices(gameConfig.prices.sort((a, b) => Number(a.id < b.id)));
    }
  }, [gameConfig]);

  // clear all data when user finished
  useEffect(() => {
    if (page === 2) {
      setQuestions(createIndexedMap(gameConfig.questions));
      setPrices(gameConfig.prices.sort((a, b) => Number(a.id < b.id)));
      setCurrentQuestionId(gameConfig.questions[0].id);
    }
  }, [page, gameConfig]);

  // console.log('questions', questions);

  const startGame = () => {
    setPage((prevPageId) => prevPageId + 1);

    updatePrice({
      [MIN_AMOUNT]: {
        value: MIN_AMOUNT,
        status: PriceItemType.SELECTED,
      },
    });
  };

  const retry = () => setPage(0);

  const [currentOption, setCurrentOption] = useState<string | null>(null);

  const currentQuestion = useMemo(() => {
    if (questions && currentQuestionId) {
      return questions.get(currentQuestionId);
    }

    return config.questions[0];
  }, [questions, currentQuestionId]);

  // console.log('current', currentQuestion, 'id', currentQuestionId);

  const updateCurrentQuestionAnswers = async (
    type: `${AnswerStateType}`,
    letter: string,
  ) => {
    if (!currentQuestion) return;

    const answers = currentQuestion.answers.map((item) => {
      if (item.letter === letter) {
        return { ...item, type };
      }

      return item;
    });

    const questionsList = new Map(questions);
    questionsList.set(currentQuestion.id, { ...currentQuestion, answers });

    setQuestions(questionsList);
  };

  const updatePrice = (item: Record<string, UpdatePriceItem>) => {
    if (!prices?.length) return;

    try {
      const updatedPrices = prices.map((price) => {
        if (price.value === item?.[price.value]?.value) {
          return { ...price, status: item?.[price.value].status };
        }

        return price;
      });

      setPrices(updatedPrices);
    } catch (err) {
      setError('Unable to update prices list, please be sure that you have correct data');
      setPrices(gameConfig.prices.sort((a, b) => Number(a.id < b.id)));
    }
  };

  const handleUpdatePrice = (currentPrice: string, nextPrice: string) => {
    updatePrice({
      [currentPrice]: {
        value: currentPrice,
        status: PriceItemType.COMPLETED,
      },
      [nextPrice]: {
        value: nextPrice,
        status: PriceItemType.SELECTED,
      },
    });
  };

  const [totalAmount, setTotalAmount] = useState(ZERO_AMOUNT);

  const handleUserChoice = (answer: string, question: QuestionItem) => {
    let updateTimeout: string | number | NodeJS.Timeout | undefined;

    if (question?.correctAnswer) {
      const isCorrect = checkIsAnswerValid(question?.correctAnswer, answer);

      updateCurrentQuestionAnswers(
        isCorrect ? AnswerStateType.CORRECT : AnswerStateType.ERROR,
        answer,
      );

      // all changes too fast added timeout to delay
      // (user have to see changing between selected option and correct / incorrect)
      if (isCorrect) {
        updateTimeout = setTimeout(() => {
          const nextQuestion = questions?.get(currentQuestionId + 1) ?? null;
          // if it was last question - redirect to final page
          if (!nextQuestion) {
            if (prices) setTotalAmount(MAX_AMOUNT);
            setPage(2);
          }

          const currentPrice = questions?.get(currentQuestionId)?.price ?? null;
          const nextPrice = !nextQuestion ? null : nextQuestion.price;

          if (currentPrice && nextPrice) {
            handleUpdatePrice(currentPrice, nextPrice);
          }

          setCurrentQuestionId((prevQuestionId) => prevQuestionId + 1);

          setCurrentOption(null);
        }, 1000);
      } else {
        updateTimeout = setTimeout(() => {
          // set total result and redirect to final screen
          setTotalAmount(questions?.get(currentQuestionId - 1)?.price ?? ZERO_AMOUNT);
          setPage(2);
          setCurrentOption(null);
        }, 1000);
      }
    }

    return () => clearTimeout(updateTimeout);
  };

  const chooseAnswer = (answer: string) => {
    let updateTimeout: string | number | NodeJS.Timeout | undefined;

    try {
      // prevent other click if option had be chosen
      if (!currentOption && currentQuestion) {
        updateCurrentQuestionAnswers(AnswerStateType.SELECTED, answer);
        setCurrentOption(answer);

        // all changes too fast added timeout to delay
        updateTimeout = setTimeout(() => {
          handleUserChoice(answer, currentQuestion);
        }, 700);
      }

      return () => clearTimeout(updateTimeout);
    } catch (err) {
      return setError('Something went wrong, please check be sure that you logic hasnt any mistakes');
    }
  };

  return {
    page,
    startGame,
    prices,
    chooseAnswer,
    currentQuestion,
    currentOption,
    retry,
    totalAmount,
    error,
    setError,
  };
};

export default useGame;
