import { BaseChallenge } from "./base.ts";
import type { ChallengeConfig } from "../types.js";

export default
  class FizzBuzzCallenge 
  extends 
  BaseChallenge<number, string[]> {
  
  constructor(challengeConfig: ChallengeConfig) {
    super(challengeConfig);
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
