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
import { IStackState } from "../../types/stack";


export const StackPage: FC = () => {
  const [value, setValue] = useState("");
  const [addInProgress, setAddInProgress] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [stack, setStack] = useState<Stack<string>>(new Stack<string>());
  const [stackState, setStackState] = useState<IStackState<string>[]>([]);


  const addItem = async (e: FormEvent, item: string) => {
    e.preventDefault();
    if (!value || stackState.length > 19 || addInProgress) return;
    setAddInProgress(true);
    setDeleteInProgress(false);

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

    setAddInProgress(false);
    setValue("");
  };


  const deleteItem = async () => {
    setAddInProgress(false);
    setDeleteInProgress(true);
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
        setDeleteInProgress(false);
        setStackState(prevState => prevState.slice(0, -1));
      }
    }
  };


  return (
    <SolutionLayout title="Стек">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={(e) => addItem(e, value)}>
          <Input
            data-testid="input"
            isLimitText={true}
            maxLength={4}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            value={value}
          />
          <Button
            data-testid="add-button"
            disabled={value.length <= 0 || stackState.length > 19 || addInProgress || deleteInProgress}
            onClick={(e) => {
              addItem(e, value);
            }}
            isLoader={addInProgress}
            text={"Добавить"}
          />
          <Button
            data-testid="delete-button"
            disabled={stack.getSize() <= 0 || addInProgress || deleteInProgress}
            onClick={deleteItem}
            isLoader={deleteInProgress}
            text={"Удалить"}
          />
          <Button
            data-testid="clear-button"
            disabled={stack.getSize() <= 0 || addInProgress || deleteInProgress}
            text={"Очистить"}
            onClick={() => {
              stack.clear();
              setStackState([]);
            }}
          />
        </form>
        <ul className={styles.stack}>
          {stackState.map((item, index) => (
            <li data-testid="stack-item" key={index} className={styles.item}>
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
