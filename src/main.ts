import { State } from './interfaces/state';
import { Yard } from './interfaces/yard';
import { yard2 } from './test-data/test-data.json';
import { blindTreeSearch } from './utils/blind-search';

const yard: Yard = { connectivityList: yard2.connectivityList };
const initState: State = { locations: yard2.initState };
const goalState: State = { locations: yard2.goalState };

console.log(blindTreeSearch(yard, initState, goalState));
