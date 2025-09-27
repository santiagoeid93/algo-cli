import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

import type { Challenge } from "../types.js";

function generateChallenge(content: Challenge<any, any>): void {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(__dirname, `${content.name}.ts`);
  const fileContent: string = `
    // ${content.name}

    // Difficulty: ${content.difficulty}
    
    // Problem Set: ${content.problemSet}

    ${content.solution}
  `
  fs.writeFileSync(filePath, fileContent)
}

export { generateChallenge };