import { State } from '../interfaces/state';
import { StateAndAction } from '../interfaces/state-action';
import { Yard } from '../interfaces/yard';
import { possibleActions } from './possible-actions';
import { result } from './result';

export function expand(state: State, yard: Yard): StateAndAction[] {
  const reachableStates: StateAndAction[] = [];
  const actions = possibleActions(yard, state);

  for (const action of actions) {
    const reachableState = result(action, state);
    reachableStates.push({ state: reachableState, action: action });
  }

  return reachableStates;
}
