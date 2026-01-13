import { describe, it, expect, beforeAll } from 'vitest';

import type { SolutionConfig } from '../../../src/types.d.ts';
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (num1: number, num2: number) => boolean;

describe('matchFrequency', () => {
  beforeAll(async () => {
    // ToDo: Find a better way to dynamically import test subjects for all suites.
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const MatchFrequency = await import(
        '../../../src/solutions/matchFrequency.ts'
      );
      const solutionConfig: SolutionConfig = getSolutionData('matchFrequency');
      ({ solution } = new MatchFrequency.default(solutionConfig));
    } else {
      ({ solution } = await import('../../../src/challenges/matchFrequency.ts'));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  });

  describe('Standard Cases', () => {
    it('should return true for numbers with matching digit frequencies', () => {
      expect(solution(1234, 2314)).toBe(true);
      expect(solution(1234, 4321)).toBe(true);
      expect(solution(5678, 8765)).toBe(true);
      expect(solution(1122, 2211)).toBe(true);
    });

    it('should return false for numbers with different digit frequencies', () => {
      expect(solution(45634, 46755)).toBe(false);
      expect(solution(123, 124)).toBe(false);
      expect(solution(1122, 1222)).toBe(false);
      expect(solution(999, 888)).toBe(false);
    });

    it('should handle numbers with repeated digits correctly', () => {
      expect(solution(112233, 223311)).toBe(true);
      expect(solution(111222, 222111)).toBe(true);
      expect(solution(123321, 321123)).toBe(true);
      expect(solution(112233, 112234)).toBe(false);
    });
  });

  describe('Edge Cases - Single and Double Digits', () => {
    it('should return true for identical single-digit numbers', () => {
      expect(solution(5, 5)).toBe(true);
      expect(solution(0, 0)).toBe(true);
      expect(solution(9, 9)).toBe(true);
    });

    it('should return false for different single-digit numbers', () => {
      expect(solution(5, 6)).toBe(false);
      expect(solution(0, 1)).toBe(false);
      expect(solution(7, 8)).toBe(false);
    });

    it('should handle two-digit numbers correctly', () => {
      expect(solution(12, 21)).toBe(true);
      expect(solution(11, 11)).toBe(true);
      expect(solution(12, 13)).toBe(false);
      expect(solution(11, 22)).toBe(false);
    });
  });

  describe('Edge Cases - Zero Handling', () => {
    it('should return true when both numbers are zero', () => {
      expect(solution(0, 0)).toBe(true);
    });

    it('should handle numbers containing zeros correctly', () => {
      expect(solution(102, 201)).toBe(true);
      expect(solution(100, 100)).toBe(true);
      expect(solution(1001, 1100)).toBe(true);
      expect(solution(102, 203)).toBe(false);
      expect(solution(100, 101)).toBe(false);
    });

    it('should handle numbers with leading zeros in string representation', () => {
      expect(solution(10, 10)).toBe(true);
      expect(solution(100, 100)).toBe(true);
    });
  });

  describe('Edge Cases - Different Lengths', () => {
    it('should return false when numbers have different digit counts', () => {
      expect(solution(123, 1234)).toBe(false);
      expect(solution(1234, 123)).toBe(false);
      expect(solution(1, 12)).toBe(false);
      expect(solution(99, 999)).toBe(false);
    });

    it('should handle single-digit vs multi-digit comparisons', () => {
      expect(solution(5, 55)).toBe(false);
      expect(solution(0, 10)).toBe(false);
      expect(solution(9, 99)).toBe(false);
    });
  });

  describe('Large Numbers', () => {
    it('should handle large numbers with matching frequencies', () => {
      expect(solution(1234567890, 9876543210)).toBe(true);
      expect(solution(111222333, 333222111)).toBe(true);
      expect(solution(123456789, 987654321)).toBe(true);
    });

    it('should handle large numbers with different frequencies', () => {
      expect(solution(1234567890, 1234567891)).toBe(false);
      expect(solution(111222333, 111222334)).toBe(false);
    });

    it('should handle very large numbers efficiently', () => {
      const large1 = 123456789012345;
      const large2 = 543210987654321;
      expect(solution(large1, large2)).toBe(true);
      
      const large3 = 123456789012345;
      const large4 = 123456789012346;
      expect(solution(large3, large4)).toBe(false);
    });
  });

  describe('Numbers with All Same Digits', () => {
    it('should return true for identical numbers with repeated digits', () => {
      expect(solution(111, 111)).toBe(true);
      expect(solution(2222, 2222)).toBe(true);
      expect(solution(999999, 999999)).toBe(true);
    });

    it('should return false for different numbers with same repeated digit but different counts', () => {
      expect(solution(111, 1111)).toBe(false);
      expect(solution(222, 2222)).toBe(false);
    });

    it('should return true for same digit count but different arrangements', () => {
      expect(solution(111, 111)).toBe(true);
      expect(solution(2222, 2222)).toBe(true);
    });
  });

  describe('Complex Digit Patterns', () => {
    it('should handle numbers with multiple digit frequencies', () => {
      expect(solution(11223344, 44332211)).toBe(true);
      expect(solution(122333, 333221)).toBe(true);
      expect(solution(1112233, 3322111)).toBe(true);
    });

    it('should correctly identify mismatched frequencies in complex patterns', () => {
      expect(solution(11223344, 11223345)).toBe(false);
      expect(solution(122333, 122334)).toBe(false);
      expect(solution(1112233, 1112234)).toBe(false);
    });

    it('should handle palindromic number pairs', () => {
      expect(solution(1221, 2112)).toBe(true);
      expect(solution(12321, 12321)).toBe(true);
      expect(solution(1234321, 1234123)).toBe(true);
    });
  });

  describe('Performance & Stress Tests', () => {
    it('should handle numbers with many repeated digits efficiently', () => {
      const num1 = 1111111111222222;
      const num2 = 2222221111111111;
      console.log(num1, num2)
      expect(solution(num1, num2)).toBe(true);
    });

    it('should handle numbers with alternating digits', () => {
      expect(solution(121212, 212121)).toBe(true);
      expect(solution(123123, 321321)).toBe(true);
      expect(solution(121212, 121213)).toBe(false);
    });
  });
});
