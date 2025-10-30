import { BaseSolution } from './base.ts';
import type { SolutionConfig } from '../types.d.ts';

export default
  class FizzBuzzSolution 
  extends 
  BaseSolution<number, string[]> {
  
  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  public solution(n: number): string[] {
    const result = [];

    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
            continue;
        }
        
        if (i % 3 === 0) {
            result.push('Fizz');
            continue;
        }

        if (i % 5 === 0) {
            result.push("Buzz");
            continue;
        }

        result.push(`${i}`);
    }

    return result;
  };
}
