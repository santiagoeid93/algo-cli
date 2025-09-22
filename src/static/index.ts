import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import type { ChallengeConfig } from '../types.js';

function _getFile(fileName: string): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
  const filePath = path.resolve(__dirname, `${fileName}.json`);
  return fs.readFileSync(filePath, 'utf-8');
}

function getChallengeData(fileName: string): ChallengeConfig {
  const config = _getFile(fileName);
  if (!config) throw new Error(`Couldn't find config file: ${fileName}.`);
  return JSON.parse(config);
}

export { getChallengeData };
