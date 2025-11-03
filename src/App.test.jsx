import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the calculator title', () => {
    render(<App />);
    const heading = screen.getByText(/Calculatrice Web/i);
    expect(heading).toBeInTheDocument();
  });
});

