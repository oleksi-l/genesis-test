/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import config from '../../constants/config.json';
import AppContainer from '../../containers/AppContainer';

describe('final screen tests', () => {
  test('when clicked by Try again needs redirect to initial screen', async () => {
    const partialConfig = {
      ...config,
      questions: config.questions.slice(config.questions.length - 1),
    };

    render(<AppContainer config={partialConfig} />);

    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText(partialConfig.questions[0].correctAnswer[0]));

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByText(/Who wants/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
