import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { SolutionConfig, CliPrompt } from '../types.d.ts';

function _getFile(fileName: string, folder: string): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
  const filePath = path.resolve(__dirname, `${folder}/${fileName}.json`);
  return fs.readFileSync(filePath, 'utf-8');
}

function getSolutionData(fileName: string): SolutionConfig {
  const config = _getFile(fileName, 'solutions');
  if (!config) throw new Error(`Couldn't find config file: ${fileName}.`);
  return JSON.parse(config);
}

function getCliSteps(): CliPrompt {
  const steps = _getFile('welcome', 'cli');
  if (!steps) throw new Error('Couldn\'t find CLI steps config.');
  return JSON.parse(steps);
}

function getConfirmationPrompt(): CliPrompt {
  const config = _getFile('confirmDelete', 'cli');
  if (!config) throw new Error('Couldn\'t find CLI confirmation config.');
  return JSON.parse(config);
}

export { getSolutionData, getCliSteps, getConfirmationPrompt };
