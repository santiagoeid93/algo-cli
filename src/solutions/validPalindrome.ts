import { BaseSolution } from './base.ts';
import type { SolutionConfig } from '../types.d.ts';

export default
  class ValidPalindromeSolution 
  extends 
  BaseSolution<[string], boolean> {
  
  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  public solution(s: string): boolean {
    if (typeof s !== 'string') return false;

    const stripped = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    if (stripped === '') return true;

    for (let i = 0, j = stripped.length - 1; i <= j; i++, j--) {
      if (stripped[i] !== stripped[j]) return false;
    }

    return true;
  };
}
