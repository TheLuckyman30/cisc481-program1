import { State } from './interfaces/state';
import { Yard } from './interfaces/yard';
import { yard3 } from './test-data/test-data.json';
import { blindTreeSearch } from './utils/blind-search';

const yard: Yard = { connectivityList: yard3.connectivityList };
const initEngineTrackNum = yard3.initState.findIndex((location) => location.includes('*')) + 1;
const goalEngineTrackNum = yard3.initState.findIndex((location) => location.includes('*')) + 1;
const initState: State = { locations: yard3.initState, engineTrackNum: initEngineTrackNum };
const goalState: State = { locations: yard3.goalState, engineTrackNum: goalEngineTrackNum };

console.log(blindTreeSearch(yard, initState, goalState));
