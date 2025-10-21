import { describe, expect, test, beforeAll } from "vitest";

import type { SolutionConfig } from "../../../src/types.d.ts";
import { getSolutionData } from '../../../src/static/index.ts';

let solution: (n: number) => string[];

describe('Fizz Buzz', () => {
  beforeAll(async () => {
    // ToDo: Find a better way to dynamically import test subjects for all suites.
    const { IS_CHALLENGE } = process.env;
    if (IS_CHALLENGE && IS_CHALLENGE !== 'true') {
      const FizzBuzz = await import('../../../src/solutions/fizzBuzz.ts');
      const solutionConfig: SolutionConfig = getSolutionData('fizzBuzz');
      ({ solution } = new FizzBuzz.default(solutionConfig));
    } else {
      ({ solution } = await import('../../../src/challenges/fizzBuzz.ts'));
      if (!solution) throw new Error('Challenge has not been attempted yet!');
    }
  })
  
  test('should return an array of numbers', () => {
    const res: string[] = solution(3);
    expect(res).toStrictEqual(['1', '2', 'Fizz']);
  });

  test('should return correct FizzBuzz sequence for n = 5', () => {
    const res: string[] = solution(5);
    expect(res).toStrictEqual(['1', '2', 'Fizz', '4', 'Buzz']);
  });

  test('should return correct FizzBuzz sequence for n = 15', () => {
    const res: string[] = solution(15);
    expect(res).toStrictEqual([
      '1', '2', 'Fizz', '4', 'Buzz',
      'Fizz', '7', '8', 'Fizz', 'Buzz',
      '11', 'Fizz', '13', '14', 'FizzBuzz'
    ]);
  });

  test('should return empty array for n = 0', () => {
    const res: string[] = solution(0);
    expect(res).toStrictEqual([]);
  });

  test('should return ["1"] for n = 1', () => {
    const res: string[] = solution(1);
    expect(res).toStrictEqual(['1']);
  });

  test('should return ["1", "2"] for n = 2', () => {
    const res: string[] = solution(2);
    expect(res).toStrictEqual(['1', '2']);
  });

  test('should return correct FizzBuzz for multiples of 3 only', () => {
    const res: string[] = solution(6);
    expect(res[2]).toBe('Fizz'); // 3
    expect(res[5]).toBe('Fizz'); // 6
  });

  test('should return correct FizzBuzz for multiples of 5 only', () => {
    const res: string[] = solution(10);
    expect(res[4]).toBe('Buzz'); // 5
    expect(res[9]).toBe('Buzz'); // 10
  });

  test('should return "FizzBuzz" for multiples of both 3 and 5', () => {
    const res: string[] = solution(30);
    expect(res[14]).toBe('FizzBuzz'); // 15
    expect(res[29]).toBe('FizzBuzz'); // 30
  });

  test('should handle larger numbers', () => {
    const n: number = 1000;
    const res: string[] = solution(n);
    expect(res.length).toBe(n);
    expect(res[2]).toBe('Fizz'); // 3
    expect(res[4]).toBe('Buzz'); // 5
    expect(res[14]).toBe('FizzBuzz'); // 15
    expect(res[999]).toBe('Buzz'); // 1000
  });
});
