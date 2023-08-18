import { ElementStates } from "../../types/element-states";
import { IQueueItem } from "../../types/queue";


// Класс Queue
export class Queue<T> {
  private elements: Array<IQueueItem<T>>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.elements = [];
  }

  // Добавление элемента в очередь
  enqueue(data: T | null): void {
    if (this.isFull()) {
      throw new Error("Queue is full");
    }
    this.elements.push({ data, state: ElementStates.Default });
  }

  // Удаление и возврат первого элемента из очереди
  dequeue(): T | null {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.elements.shift()?.data ?? null;
  }

  // Возврат первого элемента из очереди без его удаления
  front(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.elements[0].data ?? null;
  }


  // Проверка, пуста ли очередь
  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  // Проверка, заполнена ли очередь до максимального размера
  isFull(): boolean {
    return this.elements.length >= this.maxSize;
  }

  // Возврат размера очереди
  getLength(): number {
    return this.elements.length;
  }


  // Получение всех элементов очереди
  getElements(): (T | null)[] {
    return this.elements.map((item) => item.data);
  }

  // Получение индекса начала очереди
  getHeadIndex(): number {
    return 0;
  }

  // Получение индекса конца очереди
  getTailIndex(): number {
    return this.elements.length;
  }

  getMaxSize(): number {
    return this.maxSize;
  }

  // Очистка очереди
  clearQueue(): void {
    this.elements = [];
  }
}
