import { ElementStates } from "./element-states";

export interface IStackState<T> {
  item: T;
  state: ElementStates;
}