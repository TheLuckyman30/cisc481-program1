import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { Node } from '../interfaces/node';
import { StateAndAction } from '../interfaces/state-action';
import { expand } from './expand';
import { goalTest } from './goal-test';

export function blindTreeSearch(yard: Yard, initState: State, goalState: State): Action[] {
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
          const childStates: StateAndAction[] = expand(currentNode.state, yard);
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
