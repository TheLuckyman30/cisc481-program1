// Problem 4

import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { Node } from '../interfaces/node';
import { StateAndAction } from '../interfaces/state-action';
import { expand } from './expand';
import { goalTest } from './goal-test';

/**
 * This function uses the iterative deepening algorithm to find the correct action path to get from the inputed initial state to the inputed goal state
 * I chose to use use this algorithm since it is the uninformed search algorithm when all costs are the same.
 * This is an optimal solution since it will check every level of the tree for a goal state, but it will have a better space complexity than BFS since it will still check the deepest nodes first like DFS
 *
 * @param {Yard} yard
 * @param {State} initState
 * @param {State} goalState
 * @returns
 */
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

  console.dir(finalNode?.state, { depth: null });

  return actionPath;
}
