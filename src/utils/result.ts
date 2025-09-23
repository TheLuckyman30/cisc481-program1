import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';

/**
 * This function will calculate the resulting state from the given state and action
 *
 * @param {Action} action The valid action to be taken from the given state
 * @param {State} state The state that you want to find the child state for
 * @returns {State} The child state based on the given action
 */
export function result(action: Action, state: State): State {
  const newState: State = {
    locations: state.locations.map((location) => [...location]),
    engineTrackNum: state.engineTrackNum,
  };
  let movedCar: string = '';

  if (action.direction === 'left') {
    const fromTrackArray = newState.locations[action.fromTrack - 1];
    movedCar = fromTrackArray.splice(0, 1)[0];

    newState.locations[action.fromTrack - 1] = fromTrackArray;
    newState.locations[action.toTrack - 1].push(movedCar);
  } else {
    const fromTrackArray = newState.locations[action.fromTrack - 1];
    const toTrackArray = newState.locations[action.toTrack - 1];
    movedCar = fromTrackArray.splice(fromTrackArray.length - 1, 1)[0];

    newState.locations[action.fromTrack - 1] = fromTrackArray;
    newState.locations[action.toTrack - 1] = [movedCar, ...toTrackArray];
  }

  if (movedCar === '*') {
    newState.engineTrackNum = action.toTrack;
  }

  return newState;
}
