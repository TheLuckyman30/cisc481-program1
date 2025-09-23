import { State } from '../interfaces/state';

/**
 * This function calculates the heuristic for a given state, for the heuristic search functions
 *
 * @param {State} currentState The current state of the problem
 * @param {State} goalState The goal state of the problem
 * @returns {number} The heuristic value of the current state of the problem
 */
export function calculateHeuristicValue(currentState: State, goalState: State): number {
  let misplacedCars = 0;
  for (let i = 0; i < currentState.locations.length; i++) {
    for (let j = 0; j < currentState.locations[i].length; j++) {
      if (goalState.locations[i][j] != null) {
        if (goalState.locations[i][j] != currentState.locations[i][j]) {
          misplacedCars++;
        }
      } else {
        misplacedCars++;
      }
    }
  }
  return misplacedCars;
}
