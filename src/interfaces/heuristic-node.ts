import { Action } from './action';
import { State } from './state';

export interface HeuristicNode {
  state: State;
  heuristicValue: number;
  totalPathValue: number;
  fValue: number;
  actionPath: Action[];
}
