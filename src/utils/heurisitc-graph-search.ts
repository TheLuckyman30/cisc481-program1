import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { HeuristicNode } from '../interfaces/heuristic-node';
import { StateAndAction } from '../interfaces/state-action';
import { expand } from './expand';
import { goalTest } from './goal-test';
import { calculateHeuristicValue } from './calculate-heuristic';
import { PriorityQueue } from '../classes/priority-queue';

/**
 * This function uses the A* algorithm to find the correct action path to get from the inputed initial state to the inputed goal state
 *
 * @param {Yard} yard A yard object that contains a list of all the possible track connections
 * @param {State} initState The inital state of the problem
 * @param {State} goalState The goal state of the problem
 * @returns {Action[]} An array containing the correct action path to get from the initial state to the goal state
 */
export function heuristicGraphSearch(yard: Yard, initState: State, goalState: State): Action[] {
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

  const fringe: PriorityQueue<HeuristicNode> = new PriorityQueue<HeuristicNode>();
  const closedList: Set<string> = new Set<string>();
  fringe.insert(rootNode, rootNode.fValue);

  while (!fringe.isEmpty() && !goalHasBeenFound) {
    const currentNode = fringe.pop();
    if (currentNode) {
      if (goalTest(currentNode.state, goalState)) {
        finalNode = currentNode;
        goalHasBeenFound = true;
      } else {
        if (!closedList.has(JSON.stringify(currentNode.state.locations))) {
          closedList.add(JSON.stringify(currentNode.state.locations));
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
            fringe.insert(newNode, newNode.fValue);
          }
        }
      }
    }
  }

  if (finalNode) {
    actionPath = finalNode.actionPath;
  }

  console.dir(finalNode?.state, { depth: null });

  return actionPath;
}
