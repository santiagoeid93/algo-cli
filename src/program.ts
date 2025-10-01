
import { select } from "@inquirer/prompts";

import { getCliSteps } from "./static/index.ts";
import {
  getChallenge,
  getAvailableChallenges
} from "./solutions/index.ts";
import type { Action, CliStep } from "./types.js";
import { generateChallenge } from "./challenges/index.ts";


(async function program(): Promise<void> {
  /**
   * General flow:
   * 
   * I start the application
   * I am greeted with a welcome message and prompted a selection list.
   * I can select either:
   *  - [ ] Start a new challenge
   *  - [ ] Test an existing challenge
   *  - [ ] See an existing solution
   *  - [ ] Delete an existing challenge
   *  - Exit application
   */

  const welcomePrompt =  getCliSteps();
  const action: Action = await select(welcomePrompt) as Action;
  if (action === 'exit') {
    console.log('See you later!');
    process.exit(0);
  }

  const choices: CliStep[] = getAvailableChallenges();
  const challenge: string = await select({
    message: 'Select a challenge:',
    choices
  });
 
  if(action === 'start') {
    const solution = await getChallenge(challenge);
    generateChallenge(solution);
  }

  if(action === 'test') { }

  if(action === 'view') {
  }

  if(action === 'delete') { }

  
}());