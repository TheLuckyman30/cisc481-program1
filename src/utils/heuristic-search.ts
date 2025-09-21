import { Action } from '../interfaces/action';
import { State } from '../interfaces/state';
import { Yard } from '../interfaces/yard';
import { HeuristicNode } from '../interfaces/heuristic-node';
import { StateAndAction } from '../interfaces/state-action';
import { expand } from './expand';
import { goalTest } from './goal-test';
import { PriorityQueue } from '../classes/priority-queue';

function calculateHeuristicValue(currentState: State, goalState: State): number {
  let misplacedCars = 0;
  for (let i = 0; i < currentState.locations.length; i++) {
    for (let j = 0; j < currentState.locations[i].length; j++) {
      if (goalState.locations[i][j] != null) {
        if (goalState.locations[i][j] != currentState.locations[i][j]) {
          misplacedCars++;
        }
      } else {
        misplacedCars++;
      }
    }
  }
  return misplacedCars;
}

export function heuristicTreeSearch(yard: Yard, initState: State, goalState: State): Action[] {
  let goalHasBeenFound = false;
  let finalNode: HeuristicNode | null = null;
  let actionPath: Action[] = [];
  const fringe: PriorityQueue<HeuristicNode> = new PriorityQueue<HeuristicNode>();
  const rootHeuristicValue = calculateHeuristicValue(initState, goalState);
  const rootNode: HeuristicNode = {
    state: initState,
    heuristicValue: rootHeuristicValue,
    totalPathValue: 0,
    fValue: rootHeuristicValue,
    actionPath: [],
  };

  fringe.insert(rootNode, rootNode.fValue);

  while (!fringe.isEmpty() && !goalHasBeenFound) {
    const currentNode = fringe.pop();
    if (currentNode) {
      if (goalTest(currentNode.state, goalState)) {
        finalNode = currentNode;
        goalHasBeenFound = true;
      } else {
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
    // console.dir(currentNode, { depth: null });
    //console.dir(fringe, { depth: null });
  }

  if (finalNode) {
    actionPath = finalNode.actionPath;
  }

  console.dir(finalNode?.state, { depth: null });

  return actionPath;
}
