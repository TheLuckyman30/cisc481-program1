import { Action } from './interfaces/action';
import { State } from './interfaces/state';
import { Yard } from './interfaces/yard';
import { expand } from './utils/expand';
import { yard2 } from './test-data/test-data.json';
import { Node } from './interfaces/node';

function goalTest(currentState: State, goalState: State): boolean {
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

function findActionPath(yard: Yard, initState: State, goalState: State): Action[] {
  let depthLimit = 0;
  let goalHasBeenFound = false;
  let finalNode: Node | null = null;
  let actionPath: Action[] = [];

  while (!goalHasBeenFound) {
    let fringe: Node[] = [];
    const rootNode: Node = { state: initState, nodeLevel: 0, actionPath: [] };
    fringe.push(rootNode);

    while (fringe.length) {
      const currentNode = fringe.splice(0, 1)[0];
      if (goalTest(currentNode.state, goalState)) {
        finalNode = currentNode;
        goalHasBeenFound = true;
      } else {
        if (currentNode.nodeLevel <= depthLimit) {
          const childStates = expand(currentNode.state, yard);
          for (const childState of childStates) {
            const newNode: Node = {
              state: childState.state,
              nodeLevel: currentNode.nodeLevel + 1,
              actionPath: [...currentNode.actionPath, childState.action],
            };
            fringe = [newNode, ...fringe];
          }
        }
      }
    }

    depthLimit++;
  }

  if (finalNode) {
    actionPath = finalNode.actionPath;
  }

  return actionPath;
}

const yard: Yard = { connectivityList: yard2.connectivityList };
const initState: State = { locations: yard2.initState };
const goalState: State = { locations: yard2.goalState };

console.log(findActionPath(yard, initState, goalState));
