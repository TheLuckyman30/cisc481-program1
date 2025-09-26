import { yards } from './test-data/test-data.json';
import { blindTreeSearch } from './utils/blind-search';
import { dataParser } from './utils/data-parser';
import { heuristicGraphSearch } from './utils/heurisitc-graph-search';
import { heuristicTreeSearch } from './utils/heuristic-tree-search';
import * as readline from 'readline/promises';

async function main(): Promise<void> {
  const question =
    'Select what search algorithm to use:\n' +
    '1. Blind Search\n' +
    '2. Heuristic Tree Search\n' +
    '3. Heuristic Graph Search\n' +
    '4.Exit\n';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let option: string = '';
  while (option !== '4') {
    option = await rl.question(question);
    if (option === '1') {
      console.log('\nPerforming a blind tree search\n');

      for (const importedYard of yards) {
        const [yard, initState, goalState] = dataParser(importedYard);
        console.time('Total Runitme');
        console.log(blindTreeSearch(yard, initState, goalState));
      }
    } else if (option === '2') {
      console.log('\nPerforming a heuristic tree search\n');

      for (const importedYard of yards) {
        const [yard, initState, goalState] = dataParser(importedYard);
        console.time('Total Runitme');
        console.log(heuristicTreeSearch(yard, initState, goalState));
      }
    } else if (option === '3') {
      console.log('\nNow performing a heuristic graph search\n');

      for (const importedYard of yards) {
        const [yard, initState, goalState] = dataParser(importedYard);
        console.time('Total Runitme');
        console.log(heuristicGraphSearch(yard, initState, goalState));
      }
    }
    console.log('\n');
  }
  rl.close();
}

main();
