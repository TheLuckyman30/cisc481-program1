import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';

interface ImportedYard {
  connectivityList: number[][];
  initState: string[][];
  goalState: string[][];
}

export function dataParser(importedYard: ImportedYard): [Yard, State, State] {
  const yard: Yard = { connectivityList: importedYard.connectivityList };

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
