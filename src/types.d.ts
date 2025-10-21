export type Difficulty = 'easy' | 'medium' | 'hard';

export type Action = 'start' | 'test' | 'view' | 'delete' | 'exit';

export type DeleteFile = 'yes' | 'no';

export type Solution<T, U> = {
  name: string;
  problemSet: string;
  difficulty: Difficulty;
  solution(input: T): U;
}

export type SolutionConfig = {
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

export type TextStyles = ForegroundColors | BackgroundColors | Modifiers | (ForegroundColors | BackgroundColors | Modifiers)[];

// Ported this from 'node:util:types' since they are non exported members.

// https://nodejs.org/docs/latest/api/util.html#foreground-colors
    type ForegroundColors =
        | "black"
        | "blackBright"
        | "blue"
        | "blueBright"
        | "cyan"
        | "cyanBright"
        | "gray"
        | "green"
        | "greenBright"
        | "grey"
        | "magenta"
        | "magentaBright"
        | "red"
        | "redBright"
        | "white"
        | "whiteBright"
        | "yellow"
        | "yellowBright";
    // https://nodejs.org/docs/latest/api/util.html#background-colors
    type BackgroundColors =
        | "bgBlack"
        | "bgBlackBright"
        | "bgBlue"
        | "bgBlueBright"
        | "bgCyan"
        | "bgCyanBright"
        | "bgGray"
        | "bgGreen"
        | "bgGreenBright"
        | "bgGrey"
        | "bgMagenta"
        | "bgMagentaBright"
        | "bgRed"
        | "bgRedBright"
        | "bgWhite"
        | "bgWhiteBright"
        | "bgYellow"
        | "bgYellowBright";
    // https://nodejs.org/docs/latest/api/util.html#modifiers
    type Modifiers =
        | "blink"
        | "bold"
        | "dim"
        | "doubleunderline"
        | "framed"
        | "hidden"
        | "inverse"
        | "italic"
        | "none"
        | "overlined"
        | "reset"
        | "strikethrough"
        | "underline";
