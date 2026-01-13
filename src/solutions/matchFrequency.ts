import type { SolutionConfig } from '../types.js';
import { BaseSolution } from './base.ts';

export default
  class MatchFrequencySolution
  extends
  BaseSolution<number[], boolean> {
  
  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  public solution(num1: number, num2: number): boolean {
    const str1 = `${num1}`;
    const str2 = `${num2}`;
    
    if (str1.length !== str2.length) return false;
    
    const sorted1 = str1.split('').sort().join('');
    const sorted2 = str2.split('').sort().join('');

    for (let i = 0; i < str1.length; i++) {
        if (sorted1[i] !== sorted2[i]) return false;
    }
    
    return true;
  }
}
