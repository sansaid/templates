import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: add more tests - see resources
// * https://www.freecodecamp.org/news/testing-react-hooks/
// * https://reactjs.org/docs/testing-recipes.html

test('renders binboi text', () => {
  render(<App />);
  const binboiTxt = screen.getByText(/binboi/i);
  expect(binboiTxt).toBeInTheDocument();
});
