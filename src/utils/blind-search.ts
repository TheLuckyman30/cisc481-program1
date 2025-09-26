// Problem 4

import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { Node } from '../interfaces/node';
import { StateAndAction } from '../interfaces/state-action';
import { expand } from './expand';
import { goalTest } from './goal-test';

/**
 * This function uses the iterative deepening algorithm to find the correct action path to get from the given initial state to the given goal state
 *
 * @param {Yard} yard A yard object that contains a list of all the possible track connections
 * @param {State} initState The inital state of the problem
 * @param {State} goalState The goal state of the problem
 * @returns {Action[]} An array containing the correct action path to get from the initial state to the goal state
 */
export function blindTreeSearch(yard: Yard, initState: State, goalState: State): Action[] {
  let depthLimit: number = 0;
  let goalHasBeenFound: boolean = false;
  let finalNode: Node | null = null;
  let actionPath: Action[] = [];
  let numNodesExpanded: number = 0;
  const rootNode: Node = { state: initState, nodeLevel: 0, actionPath: [] };

  while (!goalHasBeenFound) {
    numNodesExpanded = 0;
    const fringe: Node[] = [];
    fringe.push(rootNode);

    while (fringe.length) {
      const currentNode = fringe.pop();
      numNodesExpanded++;
      if (currentNode) {
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
              fringe.push(newNode);
            }
          }
        }
      }
    }

    depthLimit++;
  }

  if (finalNode) {
    actionPath = finalNode.actionPath;
  }

  console.log('Total number of nodes expanded: ', numNodesExpanded);
  console.dir(finalNode?.state, { depth: null });

  return actionPath;
}
