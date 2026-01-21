import { describe, it, expect, beforeAll } from 'vitest';

import type { SolutionConfig } from '../../../src/types.d.ts';
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (n: number) => number;

describe('Fibonacci Number', () => {
  beforeAll(async () => {
    // Dynamically import the solution
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const FibonacciNumber = await import(
        '../../../src/solutions/fibonacciNumber.ts'
      );
      const solutionConfig: SolutionConfig = getSolutionData('fibonacciNumber');
      ({ solution } = new FibonacciNumber.default(solutionConfig));
    } else {
      ({ solution } = await import(
        '../../../src/challenges/fibonacciNumber.ts'
      ));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  });

  describe('Standard Cases', () => {
    it('should return the correct Fibonacci number for small inputs', () => {
      expect(solution(0)).toBe(0);
      expect(solution(1)).toBe(1);
      expect(solution(2)).toBe(1);
      expect(solution(3)).toBe(2);
      expect(solution(4)).toBe(3);
      expect(solution(5)).toBe(5);
      expect(solution(6)).toBe(8);
      expect(solution(7)).toBe(13);
    });
  });

  describe('Edge Cases', () => {
    it('should handle n = 0 correctly', () => {
      expect(solution(0)).toBe(0);
    });

    it('should handle n = 1 correctly', () => {
      expect(solution(1)).toBe(1);
    });

    it('should handle large values of n', () => {
      expect(solution(10)).toBe(55);
      expect(solution(15)).toBe(610);
      expect(solution(20)).toBe(6765);
    });
  });

  describe('Performance Cases', () => {
    it('should handle large inputs efficiently', () => {
      // This test assumes the solution is optimized for performance
      expect(solution(30)).toBe(832040);
      expect(solution(35)).toBe(9227465);
    });
  });

  describe('Invalid Inputs', () => {
    it('should throw an error for negative inputs', () => {
      expect(() => solution(-1)).toThrowError();
      expect(() => solution(-10)).toThrowError();
    });

    it('should throw an error for non-numeric inputs', () => {
      // @ts-expect-error - non-numeric input
      expect(() => solution('a')).toThrowError();
      // @ts-expect-error - null input
      expect(() => solution(null)).toThrowError();
      // @ts-expect-error - undefined input
      expect(() => solution(undefined)).toThrowError();
    });
  });
});
