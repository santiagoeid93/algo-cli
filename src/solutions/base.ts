import type { Solution, SolutionConfig, Difficulty } from "../types.d.ts";

export
  abstract class BaseSolution<T extends unknown[], U>
  implements
  Solution<T, U> {
  protected _name: string;
  protected _problemSet: string;
  protected _difficulty: Difficulty;

  constructor(protected config: SolutionConfig) {
    this._name = config.name;
    this._problemSet = config.problemSet;
    this._difficulty = config.difficulty;
  }

  public get name() { return this._name; }

  public get problemSet() { return this._problemSet; }

  public get difficulty() { return this._difficulty; }

  public abstract solution(...params: T): U;
}
