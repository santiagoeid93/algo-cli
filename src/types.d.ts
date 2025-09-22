export type Difficulty = 'easy' | 'medium' | 'hard';

export type ChallengeConfig = {
  name: string;
  problemSet: string;
  difficulty: Difficulty;
}
