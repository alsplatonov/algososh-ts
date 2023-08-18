import { ElementStates } from "../../types/element-states";

export class ListNode<T> {
  value: T;
  state: ElementStates;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
    this.state = ElementStates.Default;
  }
}


// Класс связанного списка
export class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  length: number = 0;

  constructor(initialData: T[]) {
    for (const value of initialData) {
      const newNode = new ListNode(value);
      this.insertToTail(newNode);
    }
  }

  // Добавление нового узла в начало списка
  insertToHead(newNode: ListNode<T>): void {
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.length++;
  }

  // Добавление нового узла в конец списка
  insertToTail(newNode: ListNode<T>): void {
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  // Удаление головного узла списка
  removeHead(): void {
    if (this.head) {
      this.head = this.head.next;
      this.length--;
    }
    if (this.length === 0) {
      this.tail = null;
    }
  }

  // Удаление хвостового узла списка

removeTail(): void {
  if (this.length === 0) {
    return;
  }

  if (this.length === 1) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    return;
  }

  let current = this.head;
  let previous = null;

  while (current?.next) {
    previous = current;
    current = current.next;
  }

  if (previous) {
    previous.next = null;
    this.tail = previous;
    this.length--;
  }
}

  // Вставка нового узла по указанному индексу
  insertAtIndex(newNode: ListNode<T>, index: number): void {
    if (index === 0) {
      this.insertToHead(newNode);
      return;
    }

    const prevNode = this.getNodeAtIndex(index - 1);
    if (prevNode) {
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this.length++;
    }
  }

  // Удаление узла по указанному индексу
  removeAtIndex(index: number): void {
    if (index === 0) {
      this.removeHead();
      return;
    }

    const prevNode = this.getNodeAtIndex(index - 1);
    if (prevNode && prevNode.next) {
      prevNode.next = prevNode.next.next;
      this.length--;
      if (index === this.length) {
        this.tail = prevNode;
      }
    }
  }

  // Получение узла по указанному индексу
  getNodeAtIndex(index: number): ListNode<T> | null {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current?.next || null;
    }

    return current;
  }

  // Получение данных списка
  getData() {
    const array = [];
    let current = this.head;
    while (current !== null) {
      array.push(current.value);
      current = current.next;
    }
    return { array };
  }
}