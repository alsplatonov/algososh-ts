import { ElementStates } from "./element-states";

// Определяем интерфейс для элемента очереди
export interface IQueueItem<T> {
  data: T | null;
  state: ElementStates;
}