export type Difficulty = 'easy' | 'medium' | 'hard';

export type Challenge<T, U> = {
  name: string;
  problemSet: string;
  difficulty: Difficulty;
  solution(input: T): U;
}

export type ChallengeConfig = {
  name: string;
  problemSet: string;
  difficulty: Difficulty;
}

export type FileNameMap = {
  name: string;
  value: string; 
};
