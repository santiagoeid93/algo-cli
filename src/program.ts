
import util from 'util';
import { select } from "@inquirer/prompts";

import { getCliSteps } from "./static/index.ts";
import {
  getChallenge,
  getAvailableChallenges,
  styleChallenge
} from "./solutions/index.ts";
import type { Action, CliStep } from "./types.js";
import { deleteChallenge, generateChallenge } from "./challenges/index.ts";


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
  console.log(util.styleText(['blue', 'bold', 'italic'], 'π Welcome to Algo CLI! π'), '\n');
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

  if(action === 'view') {
    const solution = await getChallenge(challenge);
    const styledSolution = styleChallenge(solution);
    console.log('\n');
    console.table({ name: solution.name, difficulty: solution.difficulty });
    console.log('===========================');
    console.log('Problem:\n', solution.problemSet);
    console.log('===========================');
    console.log('\n');
    console.log(styledSolution);
  }

  if(action === 'delete') {
    deleteChallenge(challenge);
  }
}());