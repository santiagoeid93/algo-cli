import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';
import { argv } from "node:process";
import { fileURLToPath } from 'node:url';

import type { TextStyles } from '../src/types.ts';
import { loadSpinner } from '../utils/cliSpinner.ts';

const LOG_STYLES: TextStyles = ['white', 'bold', 'italic'];
const __dirname: string = path.dirname(fileURLToPath(import.meta.url));

let [, , fileName]: string[] = argv;

// Always transform first letter to lowercase and reform file name.
fileName = `${fileName[0].toLowerCase()}${fileName.substring(1)}`;

// Setup paths.
const challengePath: string = path.resolve(__dirname, '..', `src/solutions/${fileName}.ts`);
const testPath: string = path.resolve(__dirname, '..', `test/src/challenges/${fileName}.ts`);

// Create challenge and test files.
function createFiles(): void {
  fs.openSync(challengePath, 'w');
  console.log('✅ Created challenge file.', '\n');
  fs.openSync(testPath, 'w');
  console.log('✅ Created test file.', '\n');
  
  console.log(
    util.styleText(LOG_STYLES,
    'Thanks for contributing to Algo-CL! 👋'),
    '\n'
  );
}

// Run spinner
(async function () {
  await loadSpinner(
    util.styleText(LOG_STYLES, 'Creating files...'),
    createFiles,
    1500
  )
}());
