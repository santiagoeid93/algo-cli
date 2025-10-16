import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { ChallengeConfig, CliPrompt } from '../types.d.ts';

function _getFile(fileName: string, folder: string): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
  const filePath = path.resolve(__dirname, `${folder}/${fileName}.json`);
  return fs.readFileSync(filePath, 'utf-8');
}

function getChallengeData(fileName: string): ChallengeConfig {
  const config = _getFile(fileName, 'challenges');
  if (!config) throw new Error(`Couldn't find config file: ${fileName}.`);
  return JSON.parse(config);
}

function getCliSteps(): CliPrompt {
  const steps = _getFile('welcome', 'cli');
  if (!steps) throw new Error('Couldn\'t find CLI steps config.');
  return JSON.parse(steps);
}

export { getChallengeData, getCliSteps };
