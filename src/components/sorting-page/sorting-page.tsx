
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import React, { useState, useEffect } from "react";
import styles from "./sorting.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { setDelay, generateRandomArray, bubbleSort, selectSort } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TArrayElement } from "../../types/arrayElement";

export const SortingPage: React.FC = () => {

  const [array, setArray] = useState<TArrayElement[]>([]);
  const [sortType, setSortType] = useState<'Пузырьком' | 'Выбором'>('Пузырьком'); //по-умолчанию пузырьковая
  const [sortDirection, setSortDirection] = useState<Direction>(Direction.Ascending); //по-умолчанию по возрастанию
  const [isAscendingInProgress, setIsAscendingInProgress] = useState(false);
  const [isDescendingInProgress, setIsDescendingInProgress] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(() => {  //первоначальный рандомный массив
    setArray(generateRandomArray());
  }, []);

  const generateNewArray = () => {
    setArray(generateRandomArray());
  };

  const setSortDirectionByClk = (direction: Direction) => { //нажатие на кнопку сортировки
    setSortDirection(direction);
    sortHandler(direction);
  };

  const sortHandler = async (direction: Direction) => { //основная функция сортировки
    setIsInProgress(true);
    direction === Direction.Ascending ? setIsAscendingInProgress(true) : setIsDescendingInProgress(true);

    let generator: Generator<TArrayElement[]>;

    generator = sortType === 'Пузырьком'
      ? bubbleSort(array, direction)
      : selectSort(array, direction);

    for (let result = generator.next(); !result.done; result = generator.next()) {
      setArray(result.value);
      await setDelay(SHORT_DELAY_IN_MS); //пауза для отображения результата пользователю на каждом шаге
    }

    setIsInProgress(false);
    setIsAscendingInProgress(false);
    setIsDescendingInProgress(false);
  };

  return (
    <SolutionLayout title="Сортировка массива" extraClass="pb-2">
      <div className={styles.main}>
        <div className={styles.radio_buttons}>
          <RadioInput label="Выбор"
            name="sortType"
            onChange={() => setSortType('Выбором')}
            checked={sortType === 'Выбором'}
            disabled={isInProgress} />
          <RadioInput label="Пузырёк"
            name="sortType"
            onChange={() => setSortType('Пузырьком')}
            checked={sortType === 'Пузырьком'}
            disabled={isInProgress} />
        </div>
        <div className={`${styles["array-handle_buttons"]}`}>
          <Button text="По возрастанию"
            onClick={() => setSortDirectionByClk(Direction.Ascending)}
            isLoader={isAscendingInProgress}
            disabled={isInProgress} />
          <Button text="По убыванию"
            onClick={() => setSortDirectionByClk(Direction.Descending)}
            isLoader={isDescendingInProgress}
            disabled={isInProgress} />
        </div>
        <Button text="Новый массив"
          onClick={generateNewArray}
          disabled={isInProgress} />
      </div>
      <div className={styles.array_columns}>
        {array.map((item, index) => (
          <Column key={index} index={item.value} state={item.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};