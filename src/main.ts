import { yards } from './test-data/test-data.json';
import { blindTreeSearch } from './utils/blind-search';
import { dataParser } from './utils/data-parser';
import { heuristicTreeSearch } from './utils/heuristic-search';

// for (const importedYard of yards) {
//   const [yard, initState, goalState] = dataParser(importedYard);
//   console.log(blindTreeSearch(yard, initState, goalState));
// }

const [yard, initState, goalState] = dataParser(yards[1]);
console.log(heuristicTreeSearch(yard, initState, goalState));
