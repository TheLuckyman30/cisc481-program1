import { yards } from './test-data/test-data.json';
import { blindTreeSearch } from './utils/blind-search';
import { dataParser } from './utils/data-parser';

for (const importedYard of yards) {
  const [yard, initState, goalState] = dataParser(importedYard);
  console.log(blindTreeSearch(yard, initState, goalState));
}
