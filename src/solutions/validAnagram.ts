import { BaseSolution } from './base.ts';
import type { SolutionConfig } from '../types.d.ts';
import { disallowedChars } from '../../utils/commonVariables.ts';

export default
class ValidAnagramSolution
extends
BaseSolution<string[], boolean> {

  constructor(solutionConfig: SolutionConfig) {
    super(solutionConfig);
  }

  solution(s: string, t: string): boolean {
    s = s.replace(/\s/g, '').toLowerCase();
    t = t.replace(/\s/g, '').toLowerCase();

    if (s.length !== t.length) return false;

    const dict1: Record<string, number> = {};
    const dict2: Record<string, number> = {};

    for (let i = 0; i < s.length; i++) {
      const str1 = s[i];
      if (disallowedChars.includes(str1)) continue;
      if (!dict1[str1]) {
        dict1[str1] = 1;
      } else {
        dict1[str1]++;
      }
    }

    for (let j = 0; j < t.length; j++) {
      const str2 = t[j];
      if (disallowedChars.includes(str2)) continue;
      if (!dict2[str2]) {
        dict2[str2] = 1;
      } else {
        dict2[str2]++;
      }
    }

    const keys = Object.keys(dict1);
    for (let l = 0; l < keys.length; l++) {
      console.log(dict1[keys[l]], dict2[keys[l]]);
      if (dict1[keys[l]] !== dict2[keys[l]]) return false;
    }

    return true;
  }
}
