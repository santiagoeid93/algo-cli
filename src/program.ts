
import { select } from "@inquirer/prompts";

import { getChallengeData } from "./static/index.ts";
import {
  getChallenge,
  getAvailableChallenges
} from "./challenges/index.ts";
import type { FileNameMap } from "./types.js";


(async function program(): Promise<void> {
  const challenges: FileNameMap[] = getAvailableChallenges();
  
  const selectedChallenge: string = await select({
    message: 'Select a challenge to start: ',
    choices: challenges
  });

  if (!selectedChallenge) {
    console.log('No challenge selected. Exiting...');
    process.exit(0);
  }

  const challenge = await getChallenge(selectedChallenge);
  console.log(challenge.name);
}());