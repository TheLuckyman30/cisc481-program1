import { State } from '../interfaces/state';

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
