import type { SolutionConfig } from '../types.js';
import { BaseSolution } from './base.ts';

export default
  class ReverseStringSolution
  extends
  BaseSolution<string, string> {
  
  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  public solution(s: string): string {
    const reversedArr = s.split('');

    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
      const start = s[i];
      const end = s[j];
      reversedArr[i] =  end;
      reversedArr[j] = start;
    }

    return reversedArr.join('');
  }
}
