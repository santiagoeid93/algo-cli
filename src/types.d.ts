export type Difficulty = 'easy' | 'medium' | 'hard';

export type Challenge<U, T> = {
  name: string;
  problemSet: string;
  difficulty: Difficulty;
  solution(input: U): T;
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
