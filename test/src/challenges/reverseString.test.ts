import { describe, it, expect, beforeAll } from 'vitest';

import type { SolutionConfig } from '../../../src/types.d.ts';
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (n: string) => string;

describe('reverseString', () => {
  beforeAll(async () => {
    // ToDo: Find a better way to dynamically import test subjects for all suites.
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const ReverseString = await import(
        '../../../src/solutions/reverseString.ts'
      );
      const solutionConfig: SolutionConfig = getSolutionData('reverseString');
      ({ solution } = new ReverseString.default(solutionConfig));
    } else {
      ({ solution } = await import('../../../src/challenges/reverseString.ts'));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  });

  describe('Standard Strings (Even and Odd Lengths)', () => {
    it('should correctly reverse a standard string with an **odd** length', () => {
      const input = 'hello';
      const expected = 'olleh';
      expect(solution(input)).toBe(expected);
    });
    it('should correctly reverse a standard string with an **even** length', () => {
      const input = 'abcd';
      const expected = 'dcba';
      expect(solution(input)).toBe(expected);
    });
    it('should handle a medium-length string correctly', () => {
      const input = 'pneumonia';
      const expected = 'ainomuenp';
      expect(solution(input)).toBe(expected);
    });
  });

  describe('Edge Cases (String Length)', () => {
    it('should handle an **empty** string gracefully', () => {
      const input = '';
      const expected = '';
      expect(solution(input)).toBe(expected);
    });
    it('should handle a string with a **single** character', () => {
      const input = 'x';
      const expected = 'x';
      expect(solution(input)).toBe(expected);
    });
    it('should handle a string with **two** characters', () => {
      const input = '12';
      const expected = '21';
      expect(solution(input)).toBe(expected);
    });
  });

  describe('Special Characters, Numbers, and Spacing', () => {
    it('should correctly reverse a string containing **numbers**', () => {
      const input = '12345';
      const expected = '54321';
      expect(solution(input)).toBe(expected);
    });
    it('should correctly reverse a string containing **symbols and punctuation**', () => {
      const input = '(!@#$%)';
      const expected = ')%$#@!(';
      expect(solution(input)).toBe(expected);
    });
    it('should correctly reverse a string containing **mixed case and internal spaces**', () => {
      const input = 'Hello World';
      const expected = 'dlroW olleH';
      expect(solution(input)).toBe(expected);
    });
    it('should correctly handle a string with **leading and trailing spaces**', () => {
      const input = '  test  ';
      const expected = '  tset  ';
      expect(solution(input)).toBe(expected);
    });
  });

  describe('Palindromic and Repetitive Strings', () => {
    it('should return the same string for an **odd-length palindrome**', () => {
      const input = 'racecar';
      expect(solution(input)).toBe(input);
    });
    it('should return the same string for an **even-length palindrome**', () => {
      const input = 'abba';
      expect(solution(input)).toBe(input);
    });
    it('should return the same string for a string composed of **all the same character**', () => {
      const input = 'zzzzz';
      expect(solution(input)).toBe(input);
    });
  });

  describe('Mutability Check', () => {
    it('should not modify the original input string', () => {
      const input = 'test';
      const originalInput = input;

      const result = solution(input);

      // The original string should remain unchanged
      expect(input).toBe(originalInput);
      // The result should be the reversed string
      expect(result).toBe('tset');
    });
  });
});
