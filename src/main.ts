import { yards } from './test-data/test-data.json';
import { blindTreeSearch } from './utils/blind-search';
import { dataParser } from './utils/data-parser';
import { heuristicGraphSearch } from './utils/heurisitc-graph-search';
import { heuristicTreeSearch } from './utils/heuristic-tree-search';

console.log('\nNow performing a blind tree search\n');

for (const importedYard of yards) {
  const [yard, initState, goalState] = dataParser(importedYard);
  console.log(blindTreeSearch(yard, initState, goalState));
}

console.log('\nNow performing a heuristic tree search\n');

for (const importedYard of yards) {
  const [yard, initState, goalState] = dataParser(importedYard);
  console.log(heuristicTreeSearch(yard, initState, goalState));
}

console.log('\nNow performing a heuristic graph search\n');

for (const importedYard of yards) {
  const [yard, initState, goalState] = dataParser(importedYard);
  console.log(heuristicGraphSearch(yard, initState, goalState));
}
