import { State } from '../interfaces/state';

/**
 * This function simply chekcs the current state to see if it matches the goal state
 *
 * @param {State} currentState The current state of the problem
 * @param {State} goalState The goal state of the problem
 * @returns {boolean} Whether or not the given state is the goal state
 */
export function goalTest(currentState: State, goalState: State): boolean {
  let isEqual = true;

  if (currentState.locations.length === goalState.locations.length) {
    for (let i = 0; i < currentState.locations.length && isEqual; i++) {
      if (currentState.locations[i].length === goalState.locations[i].length) {
        for (let j = 0; j < currentState.locations[i].length && isEqual; j++) {
          if (currentState.locations[i][j] != goalState.locations[i][j]) {
            isEqual = false;
          }
        }
      } else {
        isEqual = false;
      }
    }
  } else {
    isEqual = false;
  }

  return isEqual;
}
