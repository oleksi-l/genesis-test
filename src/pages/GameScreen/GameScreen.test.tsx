/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import config from '../../constants/config.json';
import AppContainer from '../../containers/AppContainer';

const createPartialConfig = (index: number) => ({
  ...config,
  questions: config.questions.slice(0, index),
});

describe('game screen tests', () => {
  test('when answer is correct he goes to next question', async () => {
    const partialConfig = createPartialConfig(2);

    render(<AppContainer config={partialConfig} />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(
      screen.getByText(partialConfig.questions[0].correctAnswer[0]),
    );

    await waitFor(
      () => expect(
        screen.getByText(partialConfig.questions[1].question),
      ).toBeInTheDocument(),
      { timeout: 2000 },
    );
  });

  test('when answer is not correct redirects to final screen and amount shouldnt be equal to failed question price', async () => {
    const partialConfig = createPartialConfig(1);

    render(<AppContainer config={partialConfig} />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('C'));

    await waitFor(
      () => expect(screen.getByText(/Total score/i)).toBeInTheDocument(),
      {
        timeout: 2000,
      },
    );

    await waitFor(
      () => {
        expect(screen.getByText(/earned/i).textContent).not.toEqual(`${partialConfig.questions[0].price} earned`);
      },
      {
        timeout: 2000,
      },
    );
  });

  test('when all answers are correct redirects to final screen and total should be 1 million', async () => {
    const partialConfig = {
      ...config,
      questions: config.questions.slice(config.questions.length - 1),
    };

    render(<AppContainer config={partialConfig} />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText(partialConfig.questions[0].correctAnswer[0]));

    await waitFor(
      () => expect(screen.getByText(/Total score/i)).toBeInTheDocument(),
      {
        timeout: 2000,
      },
    );

    await waitFor(
      () => expect(screen.getByText(/1,000,000 earned/i)).toBeInTheDocument(),
      {
        timeout: 2000,
      },
    );
  });
});
