import { BaseSolution } from './base.ts';
import type { SolutionConfig } from '../types.d.ts';

export default
  class FibonacciNumberSolution 
  extends 
  BaseSolution<number[], number> {
  
  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  public solution(n: number): number {
    if (n == null || n < 0) throw new Error('Number must be positive.');
    
    const fib = (num: number, memo: Record<number, number> = {}): number => {
      if (num < 2) return num;

      if (memo[num]) return memo[num];

      memo[num] = fib(num - 1, memo) + fib(num - 2, memo);
      return memo[num];
    };

    return fib(n);
  };
}
