// Problem 6

import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { HeuristicNode } from '../interfaces/heuristic-node';
import { StateAndAction } from '../interfaces/state-action';
import { expand } from './expand';
import { goalTest } from './goal-test';
import { calculateHeuristicValue } from './calculate-heuristic';

/**
 * This function uses the IDA* algorithm to implement a heuristic tree search and find the correct action path to get from the given initial state to the given goal state
 *
 * @param {Yard} yard A yard object that contains a list of all the possible track connections
 * @param {State} initState The inital state of the problem
 * @param {State} goalState The goal state of the problem
 * @returns {Action[]} An array containing the correct action path to get from the initial state to the goal state
 */
export function heuristicTreeSearch(yard: Yard, initState: State, goalState: State): Action[] {
  let fValueLimit;
  let goalHasBeenFound = false;
  let finalNode: HeuristicNode | null = null;
  let actionPath: Action[] = [];
  const rootHeuristicValue = calculateHeuristicValue(initState, goalState);
  const rootNode: HeuristicNode = {
    state: initState,
    heuristicValue: rootHeuristicValue,
    totalPathValue: 0,
    fValue: rootHeuristicValue,
    actionPath: [],
  };
  fValueLimit = rootNode.fValue;

  while (!goalHasBeenFound) {
    let minimumNewFValue = -1;
    const fringe: HeuristicNode[] = [];
    fringe.push(rootNode);

    while (fringe.length) {
      const currentNode = fringe.pop();
      if (currentNode) {
        if (goalTest(currentNode.state, goalState)) {
          finalNode = currentNode;
          goalHasBeenFound = true;
        } else {
          if (currentNode.fValue <= fValueLimit) {
            const childStates: StateAndAction[] = expand(currentNode.state, yard);
            for (const childState of childStates) {
              const heuristicValue = calculateHeuristicValue(childState.state, goalState);
              const newNode: HeuristicNode = {
                state: childState.state,
                heuristicValue: heuristicValue,
                totalPathValue: currentNode.totalPathValue + 1,
                fValue: currentNode.totalPathValue + 1 + heuristicValue,
                actionPath: [...currentNode.actionPath, childState.action],
              };
              fringe.push(newNode);
            }
          } else if (minimumNewFValue === -1) {
            minimumNewFValue = currentNode.fValue;
          } else if (currentNode.fValue < minimumNewFValue) {
            minimumNewFValue = currentNode.fValue;
          }
        }
      }
    }

    fValueLimit = minimumNewFValue;
  }

  if (finalNode) {
    actionPath = finalNode.actionPath;
  }

  console.dir(finalNode?.state, { depth: null });

  return actionPath;
}
