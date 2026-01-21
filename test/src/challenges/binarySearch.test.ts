import { describe, it, expect, beforeAll } from 'vitest';

import type { SolutionConfig } from '../../../src/types.d.ts';
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (numArray: number[], searchVal: number) => number;

describe('Binary Search', () => {
  beforeAll(async () => {
    // Dynamically import the solution
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const BinarySearch = await import(
        '../../../src/solutions/binarySearch.ts'
      );
      const solutionConfig: SolutionConfig = getSolutionData('binarySearch');
      ({ solution } = new BinarySearch.default(solutionConfig));
    } else {
      ({ solution } = await import('../../../src/challenges/binarySearch.ts'));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  });

  describe('Standard Cases', () => {
    it('should return the correct index for a value present in the array', () => {
      const arr = [1, 3, 5, 7, 9];
      expect(solution(arr, 5)).toBe(2);
      expect(solution(arr, 1)).toBe(0);
      expect(solution(arr, 9)).toBe(4);
    });

    it('should return -1 for a value not present in the array', () => {
      const arr = [1, 3, 5, 7, 9];
      expect(solution(arr, 4)).toBe(-1);
      expect(solution(arr, 10)).toBe(-1);
      expect(solution(arr, 0)).toBe(-1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle an empty array', () => {
      const arr: number[] = [];
      expect(solution(arr, 1)).toBe(-1);
    });

    it('should handle a single-element array', () => {
      const arr = [5];
      expect(solution(arr, 5)).toBe(0);
      expect(solution(arr, 1)).toBe(-1);
    });

    it('should handle a two-element array', () => {
      const arr = [1, 3];
      expect(solution(arr, 1)).toBe(0);
      expect(solution(arr, 3)).toBe(1);
      expect(solution(arr, 2)).toBe(-1);
    });

    it('should handle duplicate values in the array', () => {
      const arr = [1, 3, 3, 3, 5, 7];
      expect(solution(arr, 3)).toBeGreaterThanOrEqual(1);
      expect(solution(arr, 3)).toBeLessThanOrEqual(3);
    });
  });

  describe('Performance Cases', () => {
    it('should handle a large array efficiently', () => {
      const arr = Array.from({ length: 1_000_000 }, (_, i) => i + 1);
      expect(solution(arr, 500_000)).toBe(499_999);
      expect(solution(arr, 1_000_000)).toBe(999_999);
      expect(solution(arr, 1)).toBe(0);
    });

    it('should return -1 for values outside the range of the array', () => {
      const arr = Array.from({ length: 1_000_000 }, (_, i) => i + 1);
      expect(solution(arr, 0)).toBe(-1);
      expect(solution(arr, 1_000_001)).toBe(-1);
    });
  });

  describe('Invalid Inputs', () => {
    it('should handle non-numeric search values gracefully', () => {
      const arr = [1, 2, 3, 4, 5];
      // @ts-expect-error - non-numeric input
      expect(() => solution(arr, 'a')).toThrowError();
      // @ts-expect-error - null input
      expect(solution(arr, null)).toBe(-1);
    });

    it('should handle non-array inputs gracefully', () => {
      // @ts-expect-error - non-array input
      expect(() => solution(123, 1)).toThrowError();
      // @ts-expect-error - null input
      expect(() => solution(null, 1)).toThrowError();
    });
  });
});
