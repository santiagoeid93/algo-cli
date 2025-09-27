import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import type { Challenge, CliStep } from '../types.js';
import { getChallengeData } from '../static/index.ts';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

/**
 * Retrieves a list of available challenge files in the current directory, excluding specified files.
 *
 * @remarks
 * This function reads all TypeScript files in the directory, omitting those listed in the `OMIT` array.
 * It then transforms each file name into a more human-readable format by inserting spaces before uppercase letters
 * and capitalizing the first character. The result is an array of objects, each containing the formatted name and
 * the original file name (without the `.ts` extension).
 *
 * @returns An array of objects, each with a `name` (formatted for display) and `value` (original file name).
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
 * @returns A promise that resolves to an instance of the loaded challenge.
 */
async function getChallenge(fileName: string): Promise<Challenge<any, any>> {
  const challengeConfig = getChallengeData(fileName);
  const filePath = path.resolve(__dirname, `${fileName}.ts`);
  const { default: Callenge } = await import(filePath);
  return new Callenge(challengeConfig);
};

export { getChallenge, getAvailableChallenges };
