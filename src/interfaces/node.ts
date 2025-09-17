import { Action } from './action';
import { State } from './state';

export interface Node {
  state: State;
  nodeLevel: number;
  actionPath: Action[];
}
