import type { SolutionConfig } from '../types.js';
import { BaseSolution } from './base.ts';

export default
  class UniqueOcurrencesSolution
  extends
  BaseSolution<[number[] | string[]], boolean> {

  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  public solution(values: number[] | string[]): boolean {
    if (values.length < 1) return false;

    const valueCounts: { [key: string |number]: number } = {};
  
    for (let i = 0; i < values.length; i++) {
        const position = values[i];
        valueCounts[position] = valueCounts[position] ? valueCounts[values[i]] += 1 : 1;
    }

    for (const val of Object.values(valueCounts)) {
        if (val > 1) return false;
    }
    
    return true;
  }
}
