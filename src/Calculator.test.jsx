import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('should calculate addition correctly', () => {
    render(<Calculator />);

    const num1Input = screen.getByLabelText(/premier nombre/i);
    const num2Input = screen.getByLabelText(/deuxième nombre/i);
    const calculateButton = screen.getByText(/calculer/i);
    const resultInput = screen.getByLabelText(/résultat/i);

    fireEvent.change(num1Input, { target: { value: '5' } });
    fireEvent.change(num2Input, { target: { value: '3' } });
    fireEvent.click(calculateButton);

    expect(resultInput.value).toBe('8');
  });

  it('should calculate subtraction correctly', () => {
    render(<Calculator />);

    const num1Input = screen.getByLabelText(/premier nombre/i);
    const num2Input = screen.getByLabelText(/deuxième nombre/i);
    const operationSelect = screen.getByLabelText(/opération/i);
    const calculateButton = screen.getByText(/calculer/i);
    const resultInput = screen.getByLabelText(/résultat/i);

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '4' } });
    fireEvent.change(operationSelect, { target: { value: '-' } });
    fireEvent.click(calculateButton);

    expect(resultInput.value).toBe('6');
  });

  it('should display error message for division by zero', () => {
    render(<Calculator />);

    const num1Input = screen.getByLabelText(/premier nombre/i);
    const num2Input = screen.getByLabelText(/deuxième nombre/i);
    const operationSelect = screen.getByLabelText(/opération/i);
    const calculateButton = screen.getByText(/calculer/i);

    fireEvent.change(num1Input, { target: { value: '10' } });
    fireEvent.change(num2Input, { target: { value: '0' } });
    fireEvent.change(operationSelect, { target: { value: '÷' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/division par zéro impossible/i)).toBeInTheDocument();
  });
});

