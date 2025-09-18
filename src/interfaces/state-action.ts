import { Action } from './action';
import { State } from './state';

export interface StateAndAction {
  state: State;
  action: Action;
}
