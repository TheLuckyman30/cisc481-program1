import { State } from '../interfaces/state';

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
