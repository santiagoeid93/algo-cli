
import { select } from "@inquirer/prompts";

import { getChallengeData, getCliSteps } from "./static/index.ts";
import {
  getChallenge,
  getAvailableChallenges
} from "./challenges/index.ts";
import type { Action, CliStep } from "./types.js";


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
 
  if(action === 'start') { }
  
  if(action === 'test') { }

  if(action === 'view') {
    const solution = await getChallenge(challenge);
  }

  if(action === 'delete') { }

  
}());