import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';

interface ImportedYard {
  connectivityList: number[][];
  initState: string[][];
  goalState: string[][];
}

/**
 * This function is to help parse the inputed data
 *
 * @param {ImportedYard} importedYard This will be the problem you want to solve, contains the yard connectivty list, initState, and goalState
 * @returns {[Yard, State, State]} An array containing the formatted and object versions of the connectivity list, initState, and goalState
 */
export function dataParser(importedYard: ImportedYard): [Yard, State, State] {
  const yard: Yard = { connectivityList: importedYard.connectivityList };

  // This is just to track where the engine is in each state. This variable gets updated in the result function
  const initEngineTrackNum =
    importedYard.initState.findIndex((location) => location.includes('*')) + 1;
  const goalEngineTrackNum =
    importedYard.goalState.findIndex((location) => location.includes('*')) + 1;

  const initState: State = {
    locations: importedYard.initState,
    engineTrackNum: initEngineTrackNum,
  };
  const goalState: State = {
    locations: importedYard.goalState,
    engineTrackNum: goalEngineTrackNum,
  };

  return [yard, initState, goalState];
}
