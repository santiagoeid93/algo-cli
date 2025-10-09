import fs from 'fs';
import util from "util";
import path from 'path';
import beautify from 'js-beautify';
import { fileURLToPath } from 'url';

import type { Challenge, CliStep, TextStyles } from '../types.js';
import { getChallengeData } from '../static/index.ts';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

/**
 * Applies syntax highlighting styles to specific keywords and operators within a formatted string.
 * Iterates through a predefined map of keywords and operators, replacing each occurrence in the input string
 * with a styled version using the `util.styleText` function and the associated styles.
 * @private
 * @todo Find a more efficient way of doing this. 
 * @param formattedString - The input string to be styled.
 * @returns {string} The styled string with appropriate text styles applied to recognized keywords and operators.
 */
function _styleChallenge(formattedString: string): string {
  const keyWordMap: {[key: string]: TextStyles} = {
    solution: ['redBright', 'bold'],
    if: 'red',
    let: 'red',
    const: 'red',
    continue: 'red',
    '[]': 'blue',
    '{}': 'blue',
    '()': 'blue',
    '"': 'yellow',
    '`': 'yellow',
    "'": 'yellow',
    for: 'yellow',
    push: 'yellow',
    '+': 'cyan',
    '-': 'cyan',
    '&': 'cyan',
    '|': 'cyan',
    '%': 'cyan',
    '/': 'cyan',
    '=': 'cyan',
    '>': 'cyan',
    '<': 'cyan',
    '+=': 'cyan',
    '-=': 'cyan',
    return: 'cyan',
  };

  const keyWords = Object.keys(keyWordMap);

  let styled = formattedString;
  for (const word of keyWords) {
    styled = styled.replaceAll(word, util.styleText(keyWordMap[word], word));
  }

  return styled;
}

/**
 * Retrieves a list of available challenge files in the current directory, excluding specified files.
 *
 * @remarks
 * This function reads all TypeScript files in the directory, omitting those listed in the `OMIT` array.
 * It then transforms each file name into a more human-readable format by inserting spaces before uppercase letters
 * and capitalizing the first character. The result is an array of objects, each containing the formatted name and
 * the original file name (without the `.ts` extension).
 *
 * @returns {CliStep} An array of objects, each with a `name` (formatted for display) and `value` (original file name).
 */
function getAvailableChallenges(): CliStep[] {
  const OMIT = ['index.ts', 'base.ts'];
  const fileNameMap: CliStep[] = [];
  const files = fs.readdirSync(__dirname);
  
  const fileNames = files.filter((file: string) => !OMIT.includes(file))
    .map((file: string) => file.replace('.ts', ''));
  
  fileNames.map((fileName: string) => {
    let renamed = '';
    fileName.split('').forEach((char, index) => {
      const upperCase = char.toUpperCase();
      if (index === 0) {
        renamed += upperCase;
      } else if (char === upperCase) {
        renamed += ` ${char}`;
      } else {
        renamed += char;
      }
    });

    fileNameMap.push({ name: renamed, value: fileName});
  });

  return fileNameMap;
};

/**
 * Dynamically imports and instantiates a challenge class based on the provided file name.
 *
 * @param fileName - The name of the challenge file (without extension) to load.
 *
 * @remarks
 * This function retrieves the challenge configuration using `getChallengeData`,
 * resolves the file path, dynamically imports the challenge module, and returns
 * a new instance of the challenge class with the configuration.
 *
 * @throws Will throw an error if the module cannot be imported or the class cannot be instantiated.
 * @returns {Promise<Challenge<any, any>>} A promise that resolves to an instance of the loaded challenge.
 */
async function getChallenge(fileName: string): Promise<Challenge<any, any>> {
  const challengeConfig = getChallengeData(fileName);
  const filePath = path.resolve(__dirname, `${fileName}.ts`);
  const { default: Callenge } = await import(filePath);
  return new Callenge(challengeConfig);
};

/**
 * Formats and styles the solution code of a given challenge.
 *
 * This function takes a `Challenge` object, stringifies its `solution` property,
 * beautifies the resulting code string for improved readability, and then applies
 * additional styling using the `_styleChallenge` function.
 * @public
 * @param challenge - The challenge object containing the solution to be styled.
 * @returns {string} A styled and formatted string representation of the challenge's solution code.
 */
function styleChallenge(challenge: Challenge<any, any>): string {
  const stringifiedChallenge = challenge.solution.toString();

  const formattedChallenge = beautify.js(stringifiedChallenge, {
    indent_size: 2,
    space_in_empty_paren: true,
    end_with_newline: true,
    preserve_newlines: true,
    jslint_happy: true,
    indent_empty_lines: true
  });

  return _styleChallenge(formattedChallenge);
}

export { getChallenge, getAvailableChallenges, styleChallenge };
