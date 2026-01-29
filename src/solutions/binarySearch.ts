import type { SolutionConfig } from '../types.js';
import { BaseSolution } from './base.ts';

export default
  class BinarySearchSolution
  extends
  BaseSolution<[number[], number], number> {
    
  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  public solution(numArray: number[], searchVal: number): number {
    if (isNaN(searchVal)) throw new Error('Search value must be a number.');
    if (!Array.isArray(numArray)) throw new Error('Search target must be an array.');
    
    if (numArray.length < 1 || !searchVal) return -1;

    let leftPointer = 0;
    let rightPointer = numArray.length - 1;

    while (leftPointer <= rightPointer) {
      const middlePoint = Math.ceil((rightPointer + leftPointer) / 2);

      if (numArray[middlePoint] === searchVal) return middlePoint;

      if (searchVal > numArray[middlePoint]) {
        leftPointer = middlePoint + 1;
      }

      if (searchVal < numArray[middlePoint]) {
        rightPointer = middlePoint - 1;
      }
    }

    return -1;
  }
}
