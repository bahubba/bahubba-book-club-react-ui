import React from 'react';
import { render, screen } from '@testing-library/react';
import RootRoute from '../routes/root.route';

test('renders learn react link', () => {
  render(<RootRoute />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
