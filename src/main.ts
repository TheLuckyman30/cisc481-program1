import { yards } from './test-data/test-data.json';
import { blindTreeSearch } from './utils/blind-search';
import { dataParser } from './utils/data-parser';
import { heuristicTreeSearch } from './utils/heuristic-search';

for (const importedYard of yards) {
  const [yard, initState, goalState] = dataParser(importedYard);
  console.log(blindTreeSearch(yard, initState, goalState));
}

console.log('\nNow performing a heuristic search\n');

for (const importedYard of yards) {
  const [yard, initState, goalState] = dataParser(importedYard);
  console.log(heuristicTreeSearch(yard, initState, goalState));
}
