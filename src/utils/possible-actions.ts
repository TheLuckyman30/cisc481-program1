import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';

export function possibleActions(yard: Yard, state: State): Action[] {
  const possibleActions: Action[] = [];
  const allowedConnections = yard.connectivityList.filter((list) =>
    list.includes(yard.engineTrackNum)
  );

  for (const connection of allowedConnections) {
    const firstTrack = connection[0];
    const secondTrack = connection[1];

    if (state.locations[firstTrack - 1].length) {
      const newAction: Action = { direction: 'right', fromTrack: firstTrack, toTrack: secondTrack };
      possibleActions.push(newAction);
    }
    if (state.locations[secondTrack - 1].length) {
      const newAction: Action = { direction: 'left', fromTrack: secondTrack, toTrack: firstTrack };
      possibleActions.push(newAction);
    }
  }

  return possibleActions;
}
