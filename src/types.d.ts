export type Difficulty = 'easy' | 'medium' | 'hard';

export type Action = 'start' | 'test' | 'view' | 'delete' | 'exit';

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

export type CliStep = {
  name: string;
  value: string; 
};

export type CliPrompt = {
  message: string;
  choices: CliStep[];
}
