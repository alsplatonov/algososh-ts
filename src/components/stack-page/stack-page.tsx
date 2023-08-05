import { FC, ChangeEvent, FormEvent, useState } from "react";
import styles from "./stack.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils/utils";

interface IStackState<T> {
  item: T;
  state: ElementStates;
}

export const StackPage: FC = () => {
  const [value, setValue] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [stack, setStack] = useState<Stack<string>>(new Stack<string>());
  const [stackState, setStackState] = useState<IStackState<string>[]>([]);


  const addItem = async (e: FormEvent, item: string) => {
    e.preventDefault();
    if (!value || stackState.length > 19 || inProgress) return;
    setInProgress(true);

    // Добавить элемент в стек
    stack.push(value);

    // Создать новый элемент с state = "changing" и добавить в stackState
    const newItem: IStackState<string> = { item: value, state: ElementStates.Changing };
    setStackState((prevState) => [...prevState, newItem]);

    await setDelay(SHORT_DELAY_IN_MS); // Используем функцию setDelay

    const index = stackState.length - 1;

    // Обновить состояние только что добавленного элемента до значения Default
    const lastAddedItem = stack.peek();
    if (lastAddedItem) {
      setStackState((prevState) => {
        const updatedIndex = prevState.findIndex(item => item.item === lastAddedItem);
        if (updatedIndex !== -1) {
          const updatedItem = { ...prevState[updatedIndex], state: ElementStates.Default };
          const updatedState = [...prevState];
          updatedState[updatedIndex] = updatedItem;
          return updatedState;
        }
        return prevState;
      });
    }

    setInProgress(false);
    setValue("");
  };


  const deleteItem = async () => {
    const lastAddedItem = stack.peek();

    if (lastAddedItem) {
      const lastAddedIndex = stackState.findIndex(item => item.item === lastAddedItem);

      if (lastAddedIndex !== -1) {
        setStackState(prevState => {
          const updatedItem = { ...prevState[lastAddedIndex], state: ElementStates.Changing };
          const updatedState = [...prevState];
          updatedState[lastAddedIndex] = updatedItem;
          return updatedState;
        });

        await setDelay(SHORT_DELAY_IN_MS);

        stack.pop();

        setStackState(prevState => prevState.slice(0, -1));
      }
    }
  };


  return (
    <SolutionLayout title="Стек">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={(e) => addItem(e, value)}>
          <Input
            isLimitText={true}
            maxLength={4}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            value={value}
          />
          <Button
            disabled={value.length <= 0 || stackState.length > 19 || inProgress}
            onClick={(e) => {
              addItem(e, value);
            }}
            isLoader={false}
            text={"Добавить"}
          />
          <Button
            disabled={stack.getSize() <= 0 || inProgress}
            onClick={deleteItem}
            isLoader={false}
            text={"Удалить"}
          />
          <Button
            disabled={stack.getSize() <= 0 || inProgress}
            text={"Очистить"}
            onClick={() => {
              stack.clear();
              setStackState([]);
            }}
          />
        </form>
        <ul className={styles.stack}>
          {stackState.map((item, index) => (
            <li key={index} className={styles.item}>
              <Circle
                state={item.state}
                index={index}
                letter={item.item}
                head={stackState.length - 1 === index ? "top" : ""}
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
