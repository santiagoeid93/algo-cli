import type { ChallengeConfig, Difficulty } from "../types.js";

export abstract class BaseChallenge<T, U> {
  protected _name: string;
  protected _problemSet: string;
  protected _difficulty: Difficulty;

  constructor(protected config: ChallengeConfig) {
    this._name = config.name;
    this._problemSet = config.problemSet;
    this._difficulty = config.difficulty;
  }

  public get name(): string { return this._name; }

  public get problemSet(): string { return this._problemSet; }

  public get difficulty(): string { return this._difficulty; }

  public abstract solution(params: T): U;
}
