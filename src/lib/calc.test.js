import { describe, it, expect } from 'vitest';
import { add, sub, mul, div } from './calc';

describe('calc', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    it('should add zero', () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
    });

    it('should handle decimal numbers', () => {
      expect(add(1.5, 2.5)).toBe(4);
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('sub', () => {
    it('should subtract two positive numbers', () => {
      expect(sub(5, 3)).toBe(2);
    });

    it('should subtract negative numbers', () => {
      expect(sub(-2, -3)).toBe(1);
    });

    it('should subtract positive and negative numbers', () => {
      expect(sub(5, -3)).toBe(8);
    });

    it('should subtract zero', () => {
      expect(sub(5, 0)).toBe(5);
      expect(sub(0, 5)).toBe(-5);
    });

    it('should handle decimal numbers', () => {
      expect(sub(5.5, 2.5)).toBe(3);
    });
  });

  describe('mul', () => {
    it('should multiply two positive numbers', () => {
      expect(mul(3, 4)).toBe(12);
    });

    it('should multiply negative numbers', () => {
      expect(mul(-2, -3)).toBe(6);
    });

    it('should multiply positive and negative numbers', () => {
      expect(mul(5, -3)).toBe(-15);
    });

    it('should multiply by zero', () => {
      expect(mul(5, 0)).toBe(0);
      expect(mul(0, 5)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(mul(2.5, 4)).toBe(10);
    });
  });

  describe('div', () => {
    it('should divide two positive numbers', () => {
      expect(div(10, 2)).toBe(5);
    });

    it('should divide negative numbers', () => {
      expect(div(-10, -2)).toBe(5);
    });

    it('should divide positive and negative numbers', () => {
      expect(div(10, -2)).toBe(-5);
    });

    it('should handle decimal results', () => {
      expect(div(5, 2)).toBe(2.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => div(10, 0)).toThrow('Division par zéro impossible');
      expect(() => div(-10, 0)).toThrow('Division par zéro impossible');
      expect(() => div(0, 0)).toThrow('Division par zéro impossible');
    });

    it('should handle division by very small numbers', () => {
      expect(div(10, 0.1)).toBe(100);
    });
  });
});

