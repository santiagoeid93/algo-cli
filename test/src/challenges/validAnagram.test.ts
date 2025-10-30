import { describe, it, expect, beforeAll } from 'vitest';

import type { SolutionConfig } from '../../../src/types.d.ts';
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (s: string, t: string) => boolean;

describe('validAnagram', () => {
  beforeAll(async () => {
    // ToDo: Find a better way to dynamically import test subjects for all suites.
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const validAnagram = await import(
        '../../../src/solutions/validAnagram.ts'
      );
      const solutionConfig: SolutionConfig = getSolutionData('validAnagram');
      ({ solution } = new validAnagram.default(solutionConfig));
    } else {
      ({ solution } = await import('../../../src/challenges/validAnagram.ts'));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  });
  describe('Standard Strings', () => {
    it('should return true for basic anagrams', () => {
      expect(solution('listen', 'silent')).toBe(true);
      expect(solution('evil', 'vile')).toBe(true);
      expect(solution('rail safety', 'fairy tales')).toBe(true);
    });

    it('should return false for non-anagrams', () => {
      expect(solution('hello', 'world')).toBe(false);
      expect(solution('test', 'ttew')).toBe(false);
      expect(solution('anagram', 'nagaramm')).toBe(false);
    });
  });

  describe('Case Sensitivity', () => {
    it('should fail if case sensitivity is not ignored', () => {
      // only pass if implementation is strict about casing
      // optional: change behavior if function lowercases inputs
      expect(solution('a', 'A')).toBe(true);
    });
  });

  describe('Whitespace and punctuation', () => {
    it('should ignore spaces and punctuation', () => {
      expect(solution('rail safety!!', 'fairy tales!!')).toBe(true);
      expect(solution('conversation', 'voices rant on')).toBe(true);
    });

    it('should handle mixed whitespace correctly', () => {
      // expect(solution('dormitory ', 'dirty room')).toBe(true);
      expect(solution('dirty room', 'dormitory')).toBe(true);
    });
  });

  describe('unicode & accented characters', () => {
    it('should handle unicode and accented characters', () => {
      expect(solution('résumé', 'ésumér')).toBe(true);
      expect(solution('東京', '京東')).toBe(true);
      expect(solution('mañana', 'aaamnñ')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return true for two empty strings', () => {
      expect(solution('', '')).toBe(true);
    });

    it('should return false if only one string is empty', () => {
      expect(solution('', 'a')).toBe(false);
      expect(solution('abc', '')).toBe(false);
    });

    it('should return false for strings of different lengths', () => {
      expect(solution('ab', 'a')).toBe(false);
      expect(solution('abcd', 'abc')).toBe(false);
    });
  });

  describe('performance & large inputs', () => {
    it('should handle very large inputs efficiently', () => {
      const a = 'a'.repeat(100000) + 'b';
      const b = 'b' + 'a'.repeat(100000);
      expect(solution(a, b)).toBe(true);
    });

    it('should detect non-anagram large inputs', () => {
      const a = 'a'.repeat(100000);
      const b = 'a'.repeat(99999) + 'b';
      expect(solution(a, b)).toBe(false);
    });
  });

  describe('type safety', () => {
    it('should only accept strings as arguments', () => {
      // @ts-expect-error - only strings allowed
      expect(() => solution(123, '321')).toThrowError();
      // @ts-expect-error - null not allowed
      expect(() => solution(null, 'test')).toThrowError();
    });
  });
});
