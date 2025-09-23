// Problem 3

import { State } from '../interfaces/state';
import { StateAndAction } from '../interfaces/state-action';
import { Yard } from '../interfaces/yard';
import { possibleActions } from './possible-actions';
import { result } from './result';

/**
 * This function will calculate all possible states and actions to get to those states from the given state
 *
 * @param {State} state The state that you want to find all possible child states for
 * @param {Yard} yard A yard object that contains a list of all the possible track connections
 * @returns {StateAndAction} An array of objects that contain child states of the inputed state aswell as the actions needed to get there
 */
export function expand(state: State, yard: Yard): StateAndAction[] {
  const reachableStates: StateAndAction[] = [];
  const actions = possibleActions(yard, state);

  for (const action of actions) {
    const reachableState = result(action, state);
    reachableStates.push({ state: reachableState, action: action });
  }

  return reachableStates;
}
