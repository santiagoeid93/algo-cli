import { describe, expect, test } from "vitest";

import FizzBuzz from '../../../src/solutions/fizzBuzz.ts';
import { getChallengeData } from '../../../src/static/index.ts';

const challengeConfig = getChallengeData('fizzBuzz');
const { solution } = new FizzBuzz(challengeConfig);

describe('Fizz Buzz', () => {
  test('should return an array of numbers', () => {
    const res = solution(3);
    expect(res).toStrictEqual(['1', '2', 'Fizz']);
  });
});
