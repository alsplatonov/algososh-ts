import React, { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import styles from "./queue.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils/utils";
import { IQueueItem } from "../../types/queue";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const queue = useRef(new Queue<string>(7));

  const initialQueueState = Array.from({ length: 7 }, () => ({
    data: "",
    state: ElementStates.Default,
  }));

  const [queueState, setQueueState] = useState<IQueueItem<string>[]>(initialQueueState);

  useEffect(() => {
    setQueueState([...setState()]);
  }, []);

  const setState = () => {
    const arr: IQueueItem<string>[] = [];
    const queueCopy = queue.current.getElements();
    for (let i = 0; i < queueCopy.length; i++) {
      arr.push({ data: queueCopy[i], state: ElementStates.Default });
    }
    return arr;
  };

  const addItem = async (e: FormEvent, item: string) => {
    e.preventDefault();
    if (!item || queueState.length >= 7 || inProgress) return;

    setInProgress(true);

    // Добавить элемент
    queue.current.enqueue(item);

    // Создать новый элемент с state = "changing" и добавить в queueState
    const newItem: IQueueItem<string> = { data: item, state: ElementStates.Changing };
    setQueueState((prevQueueState) => [...prevQueueState, newItem]);

    await setDelay(SHORT_DELAY_IN_MS); // Используем функцию setDelay

    // Обновить состояние только что добавленного элемента до значения Default
    setQueueState((prevQueueState) =>
      prevQueueState.map((item, index) =>
        index === prevQueueState.length - 1 ? { ...item, state: ElementStates.Default } : item
      )
    );

    setInProgress(false);
    setValue("");
  };

  const deleteItem = async () => {
    if (queue.current.isEmpty() || inProgress) {
      return;
    }
    setInProgress(true);
    const headIndex = queue.current.getHeadIndex();
    setQueueState((prevQueueState) => {
      const newState = [...prevQueueState];
      newState[headIndex] = { ...newState[headIndex], state: ElementStates.Changing };
      return newState;
    });

    await setDelay(SHORT_DELAY_IN_MS); // Используем функцию setDelay

    queue.current.dequeue();
    setQueueState([...setState()]);
    setInProgress(false);
  };

  const clearQueue = async () => {
    queue.current.clearQueue();
    setQueueState([...setState()]);
  };


  return (
    <SolutionLayout title="Очередь">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={(e) => addItem(e, value)}>
          <Input
            isLimitText={true}
            placeholder={"Введите значение"}
            maxLength={4}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            value={value}
          />
          <Button
            disabled={value.length <= 0 || inProgress}
            onClick={(e) => addItem(e, value)}
            isLoader={false}
            text={"Добавить"}
          />
          <Button
            disabled={queue.current.isEmpty() || inProgress}
            onClick={deleteItem}
            isLoader={false}
            text={"Удалить"}
          />
          <Button
            disabled={(queue.current.isEmpty() && queueState.every((item) => item.data === "")) || inProgress}
            text={"Очистить"}
            onClick={clearQueue}
          />
        </form>
        <ul className={styles.circles}>
          {queueState.map((item, index) => (
            <li key={index} className={styles.item}>
              <Circle
                state={item.state}
                index={index}
                letter={item.data || ""}
                head={item.data === "" ? "head" : index === queue.current.getHeadIndex() ? "head" : ""}
                tail={item.data && index === queue.current.getTailIndex() - 1 ? "tail" : ""}
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
