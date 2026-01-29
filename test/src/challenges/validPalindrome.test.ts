import { describe, it, expect, beforeAll } from 'vitest';

import type { SolutionConfig } from '../../../src/types.d.ts';
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (s: string) => boolean;

describe('validPalindrome', () => {
  beforeAll(async () => {
    // Dynamically import the solution
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const ValidPalindrome = await import(
        '../../../src/solutions/validPalindrome.ts'
      );
      const solutionConfig: SolutionConfig = getSolutionData('validPalindrome');
      ({ solution } = new ValidPalindrome.default(solutionConfig));
    } else {
      ({ solution } = await import(
        '../../../src/challenges/validPalindrome.ts'
      ));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  });

  describe('Basic Palindrome Cases', () => {
    it('should return true for a simple palindrome', () => {
      expect(solution('racecar')).toBe(true);
      expect(solution('madam')).toBe(true);
      expect(solution('a')).toBe(true);
      expect(solution('')).toBe(true);
      expect(solution('A man, a plan, a canal: Panama')).toBe(true);
    });

    it('should return false for a non-palindrome', () => {
      expect(solution('hello')).toBe(false);
      expect(solution('palindrome')).toBe(false);
      expect(solution('abc')).toBe(false);
    });
  });

  describe('Case Sensitivity', () => {
    it('should manage lettercase when checking for palindrome', () => {
      expect(solution('RaceCar')).toBe(true);
      expect(solution('MadAm')).toBe(true);
      expect(solution('Aba')).toBe(true);
    });
  });

  describe('Alphanumeric and Special Characters', () => {
    it('should ignore spaces, punctuation, and symbols', () => {
      expect(solution('A man, a plan, a canal: Panama')).toBe(true);
      expect(solution('No lemon, no melon!')).toBe(true);
      expect(solution('Eva, can I see bees in a cave?')).toBe(true);
      expect(solution('Was it a car or a cat I saw?')).toBe(true);
      expect(solution('Red roses run no risk, sir, on Nurse’s order.')).toBe(true);
    });

    it('should ignore numbers and treat them as valid characters', () => {
      expect(solution('12321')).toBe(true);
      expect(solution('1a2')).toBe(false);
      expect(solution('1a2a1')).toBe(true);
      expect(solution('12 21')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should return true for an empty string', () => {
      expect(solution('')).toBe(true);
    });

    it('should return true for a string with only non-alphanumeric characters', () => {
      expect(solution('!!!')).toBe(true);
      expect(solution('   ')).toBe(true);
      expect(solution('.,;:')).toBe(true);
    });

    it('should return true for a string with a single alphanumeric character', () => {
      expect(solution('a')).toBe(true);
      expect(solution('1')).toBe(true);
      expect(solution('Z')).toBe(true);
    });

    it('should return true for a string with two identical alphanumeric characters', () => {
      expect(solution('aa')).toBe(true);
      expect(solution('11')).toBe(true);
      expect(solution('BB')).toBe(true);
    });

    it('should return false for a string with two different alphanumeric characters', () => {
      expect(solution('ab')).toBe(false);
      expect(solution('a1')).toBe(false);
      expect(solution('1b')).toBe(false);
    });
  });

  describe('Long Palindromes and Performance', () => {
    it('should handle long palindromic strings efficiently', () => {
      const half = 'a'.repeat(50000);
      const palindrome = half + half.split('').reverse().join('');
      expect(solution(palindrome)).toBe(true);
    });

    it('should handle long non-palindromic strings efficiently', () => {
      const half = 'a'.repeat(50000);
      const nonPalindrome = half + 'b' + half;
      expect(solution(nonPalindrome)).toBe(true);
    });
  });

  describe('Unicode and Accented Characters', () => {
    it('should ignore non-ASCII letters and treat only a-z, A-Z, 0-9', () => {
      expect(solution('réifier')).toBe(false); // accents are stripped
      expect(solution('あいいあ')).toBe(true); // non-latin, stripped to empty, so true
      expect(solution('12321😊')).toBe(true); // emoji ignored
    });
  });

  describe('Type Safety', () => {
    it('should return false for non-string input', () => {
      // @ts-expect-error - number input
      expect(solution(12321)).toBe(false);
      // @ts-expect-error - null input
      expect(solution(null)).toBe(false);
      // @ts-expect-error - undefined input
      expect(solution(undefined)).toBe(false);
      // @ts-expect-error - array input
      expect(solution(['a', 'b', 'a'])).toBe(false);
      // @ts-expect-error - object input
      expect(solution({})).toBe(false);
    });
  });
});
