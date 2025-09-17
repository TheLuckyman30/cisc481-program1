import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';

export function result(action: Action, state: State): State {
  const newState: State = { locations: state.locations.map((location) => [...location]) };
  if (action.direction === 'left') {
    const fromTrackArray = newState.locations[action.fromTrack - 1];
    const movedCar = fromTrackArray.splice(0, 1)[0];

    newState.locations[action.fromTrack - 1] = fromTrackArray;
    newState.locations[action.toTrack - 1].push(movedCar);
  } else {
    const fromTrackArray = newState.locations[action.fromTrack - 1];
    const toTrackArray = newState.locations[action.toTrack - 1];
    const movedCar = fromTrackArray.splice(fromTrackArray.length - 1, 1)[0];

    newState.locations[action.fromTrack - 1] = fromTrackArray;
    newState.locations[action.toTrack - 1] = [movedCar, ...toTrackArray];
  }
  return newState;
}
