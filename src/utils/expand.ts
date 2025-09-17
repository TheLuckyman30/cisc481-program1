import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { possibleActions } from './possible-actions';
import { result } from './result';

export function expand(state: State, yard: Yard): State[] {
  const reachableStates: State[] = [];
  const actions = possibleActions(yard, state);

  for (const action of actions) {
    const reachableState = result(action, state);
    reachableStates.push(reachableState);
  }

  return reachableStates;
}
