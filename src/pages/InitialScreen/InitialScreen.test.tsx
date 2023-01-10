/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import config from '../../constants/config.json';
import AppContainer from '../../containers/AppContainer';

describe('intitial screen tests', () => {
  test('redirects to game screen when on initial screen click by `Start` button', () => {
    render(<AppContainer config={config} />);

    fireEvent.click(screen.getByText(/Start/i));
    const questionTitle = config.questions[0].question;
    expect(screen.getByText(questionTitle)).toBeInTheDocument();
  });
});
