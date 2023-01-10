import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import App from './App';

test('renders first screen', () => {
  render(<App />);

  expect(screen.getByText(/Who wants/i)).toBeInTheDocument();
});
