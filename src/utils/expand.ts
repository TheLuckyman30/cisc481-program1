import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { possibleActions } from './possible-actions';
import { result } from './result';

export function expand(state: State, yard: Yard): { state: State; action: Action }[] {
  const reachableStates: { state: State; action: Action }[] = [];
  const actions = possibleActions(yard, state);

  for (const action of actions) {
    const reachableState = result(action, state);
    reachableStates.push({ state: reachableState, action: action });
  }

  return reachableStates;
}
