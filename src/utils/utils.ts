import { ElementStates } from "../types/element-states";
import { Direction } from "../types/direction";

export const setDelay = (duration: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};


export const reverseString = (str: string): string => {
  let reversedStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i];
  }
  return reversedStr;
};


export type ArrayElement = { value: number, state: ElementStates };

export function generateRandomArray(): ArrayElement[] {
  const minLen = 3;  //от 3 до 17 элементов
  const maxLen = 17;

  const arrayLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  const randomArray: ArrayElement[] = [];

  for (let i = 0; i < arrayLength; i++) {
    randomArray.push({ value: Math.floor(Math.random() * 100) + 1, state: ElementStates.Default });
  }

  return randomArray;
}

export function generateRandomList(): string[] {
  const minLen = 3;
  const maxLen = 7;
  const arrayLength = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  
  const randomList: string[] = [];
  
  for (let i = 0; i < arrayLength; i++) {
    const randomValue = Math.floor(Math.random() * 9999) + 1;
    randomList.push(randomValue.toString());
  }
  
  return randomList;
}


//функции-генераторы для сортировок, визуализирующие процесс сортировки с помощью изменения состояния элементов массива на каждом шаге
export function* bubbleSort(arr: ArrayElement[], direction: Direction): Generator<ArrayElement[]> {
  let arrayInProgress = [...arr];

  for (let i = 0; i < arrayInProgress.length - 1; i++) {
    for (let j = 0; j < arrayInProgress.length - i - 1; j++) {
      if (arrayInProgress[j]) {
        arrayInProgress[j].state = ElementStates.Changing;
      }
      if (arrayInProgress[j + 1]) {
        arrayInProgress[j + 1].state = ElementStates.Changing;
      }
      yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации

      const shouldSwap =
        (direction === Direction.Ascending && arrayInProgress[j]?.value > arrayInProgress[j + 1]?.value) ||
        (direction === Direction.Descending && arrayInProgress[j]?.value < arrayInProgress[j + 1]?.value);

      if (shouldSwap) {
        [arrayInProgress[j], arrayInProgress[j + 1]] = [arrayInProgress[j + 1], arrayInProgress[j]];
      }

      if (arrayInProgress[j]) {
        arrayInProgress[j].state = ElementStates.Default;
      }
      if (arrayInProgress[j + 1]) {
        arrayInProgress[j + 1].state = ElementStates.Default;
      }
      yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации
    }

    if (arrayInProgress[arrayInProgress.length - i - 1]) {
      arrayInProgress[arrayInProgress.length - i - 1].state = ElementStates.Modified;
    }
    yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации
  }

  if (arrayInProgress[0]) {
    arrayInProgress[0].state = ElementStates.Modified;
  }
  yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации
}



export function* selectSort(arr: ArrayElement[], direction: Direction): Generator<ArrayElement[]> {
  let arrayInProgress = [...arr];

  for (let i = 0; i < arrayInProgress.length - 1; i++) {
    let minIndex = i;
    arrayInProgress[i].state = ElementStates.Changing;
    yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации

    for (let j = i + 1; j < arrayInProgress.length; j++) {
      arrayInProgress[j].state = ElementStates.Changing;
      yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации

      if (
        (direction === Direction.Ascending && arrayInProgress[j].value < arrayInProgress[minIndex].value) ||
        (direction === Direction.Descending && arrayInProgress[j].value > arrayInProgress[minIndex].value)
      ) {
        arrayInProgress[minIndex].state = ElementStates.Default;
        minIndex = j;
      } else {
        arrayInProgress[j].state = ElementStates.Default;
      }
      yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации
    }

    if (minIndex !== i) {
      [arrayInProgress[i], arrayInProgress[minIndex]] = [arrayInProgress[minIndex], arrayInProgress[i]];
    }

    arrayInProgress[i].state = ElementStates.Modified;
    yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации
  }

  arrayInProgress[arrayInProgress.length - 1].state = ElementStates.Modified;
  yield arrayInProgress.slice(); // Создаем копию массива и передаем ее для визуализации
}

