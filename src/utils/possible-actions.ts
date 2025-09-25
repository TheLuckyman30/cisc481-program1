// Problem 1

import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';

/**
 * This function will calculate all possible actions from the given state using the yard connectivity list
 *
 * @param {Yard} yard A yard object that contains a list of all the possible track connections
 * @param {State} state The state that you want to find all possible actions for
 * @returns {Action[]} All possible actions from the given state
 */
export function possibleActions(yard: Yard, state: State): Action[] {
  const possibleActions: Action[] = [];

  for (const [firstTrack, secondTrack] of yard.connectivityList) {
    if (state.engineTrackNum === firstTrack || state.engineTrackNum === secondTrack) {
      if (state.locations[firstTrack - 1].length) {
        const newAction: Action = {
          direction: 'right',
          fromTrack: firstTrack,
          toTrack: secondTrack,
        };
        possibleActions.push(newAction);
      }
      if (state.locations[secondTrack - 1].length) {
        const newAction: Action = {
          direction: 'left',
          fromTrack: secondTrack,
          toTrack: firstTrack,
        };
        possibleActions.push(newAction);
      }
    }
  }

  return possibleActions;
}
