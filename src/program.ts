
import util from 'util';
import figlet from 'figlet';
import { select } from "@inquirer/prompts";

import { getCliSteps } from "./static/index.ts";
import {
  getChallenge,
  getAvailableChallenges,
  styleChallenge
} from "./solutions/index.ts";
import type { Action, CliStep } from "./types.d.ts";
import { deleteChallenge, generateChallenge } from "./challenges/index.ts";


(async function program(): Promise<void> {
  // CLI Banner
  const banner = await figlet.text('ALGO-CLI', {
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true
  });
  console.log(util.styleText(['blue', 'bold'], banner), '\n');

  // CLI Welcome menu
  const welcomePrompt =  getCliSteps();
  console.log(util.styleText(['blue', 'bold', 'italic'], 'π Welcome to Algo CLI! π'), '\n');
  const action: Action = await select(welcomePrompt) as Action;
  if (action === 'exit') {
    console.log('\n', util.styleText(['blue', 'bold', 'italic'], 'π See you later! π'), '\n');
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
