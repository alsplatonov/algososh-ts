import { ElementStates } from "../../types/element-states";
import { IStackState } from "../../types/stack";

export class Stack<T> {
  private items: IStackState<T>[]; 

  constructor() {
    this.items = [];
  }

  // Добавление элемента в стек
  push(item: T): void {
    this.items.push({ item, state: ElementStates.Default }); 
  }

  // Удаление и возврат последнего элемента из стека
  pop(): T | undefined {
    return this.items.pop()?.item;
  }

  // Возврат последнего элемента из стека без его удаления
  peek(): T | undefined {
    return this.items[this.items.length - 1]?.item;
  }

  // Проверка, пуст ли стек
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Возврат размера стека
  getSize(): number {
    return this.items.length;
  }

  // Очистка стека
  clear(): void {
    this.items = [];
  }
}
