import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders first screen', () => {
  render(<App />);
  const gameScreen = screen.getByText(/Who wants/i);

  expect(gameScreen).toBeInTheDocument();
});
