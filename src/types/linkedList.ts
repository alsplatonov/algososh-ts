import { ElementStates } from "./element-states";

export interface IListState<T> {
  item: T;
  state: ElementStates;
  insertProgress: boolean;
  removeProgress: boolean;
  tempItem: T;
}