import { describe, it, expect, beforeAll } from 'vitest';

import type { SolutionConfig } from '../../../src/types';
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (values: number[] | string[]) => boolean;

describe('Unique Occurrences', () => {
  beforeAll(async () => {
    // Dynamically import the solution
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const UniqueOcurrences = await import(
        '../../../src/solutions/uniqueOcurrences.ts'
      );
      const solutionConfig: SolutionConfig = getSolutionData('uniqueOcurrences');
      ({ solution } = new UniqueOcurrences.default(solutionConfig));
    } else {
      ({ solution } = await import('../../../src/challenges/uniqueOcurrences.ts'));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  });

  describe('Standard Cases', () => {
    it('should return true for unique occurrences', () => {
      expect(solution([1, 2, 3, 4, 5, 6])).toBe(true);
      expect(solution(['a', 'b', 'c', 'd', 'e', 'f'])).toBe(true);
    });

    it('should return false for non-unique occurrences', () => {
      expect(solution([1, 2, 2, 3, 3])).toBe(false);
      expect(solution(['a', 'b', 'b', 'c', 'c'])).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle an empty array', () => {
      expect(solution([])).toBe(false);
    });

    it('should handle an array with one element', () => {
      expect(solution([1])).toBe(true);
      expect(solution(['a'])).toBe(true);
    });

    it('should handle an array with all identical elements', () => {
      expect(solution([1, 1, 1, 1])).toBe(false); 
      expect(solution(['a', 'a', 'a'])).toBe(false);
    });
  });

  describe('Performance Cases', () => {
    it('should handle a large array with unique occurrences', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i); // Repeats 0-9
      expect(solution(largeArray)).toBe(true);
    });

    it('should handle a large array with non-unique occurrences', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i % 5); // Repeats 0-4
      expect(solution(largeArray)).toBe(false);
    });
  });
});
