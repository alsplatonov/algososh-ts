import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./list.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./list";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { setDelay, generateRandomList } from "../../utils/utils";
import { ListNode } from "./list";
import { IListState } from "../../types/linkedList";


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [listState, setListState] = useState<IListState<typeof inputValue>[]>(
    []
  );
  const [insertToHeadInProgress, setInsertToHeadInProgress] = useState(false);
  const [insertToTailInProgress, setInsertToTailInProgress] = useState(false);
  const [removeHeadInProgress, setRemoveHeadInProgress] = useState(false);
  const [removeTailInProgress, setRemoveTailInProgress] = useState(false);
  const [insertAtIndexInProgress, setInsertAtIndexInProgress] = useState(false);
  const [removeAtIndexInProgress, setRemoveAtIndexInProgress] = useState(false);

  const list = useRef(new LinkedList(generateRandomList()));


  useEffect(() => {
    setListState([...setState()]);
  }, []);

  const setState = () => {
    const arr: IListState<typeof inputValue>[] = [];
    const queueCopy = list.current.getData().array;
    for (let i = 0; i < queueCopy.length; i++) {
      arr.push({
        item: queueCopy[i],
        state: ElementStates.Default,
        insertProgress: false,
        removeProgress: false,
        tempItem: "",
      });
    }
    return arr;
  };


  const insertHead = async (value: typeof inputValue) => {
    setInsertToHeadInProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[0].insertProgress = true;
    listStateCopy[0].tempItem = value;
    setListState([...listStateCopy]);

    await setDelay(SHORT_DELAY_IN_MS);

    listStateCopy[0].insertProgress = false;
    listStateCopy[0].tempItem = "";
    listStateCopy.unshift({
      item: value,
      state: ElementStates.Modified,
      insertProgress: false,
      removeProgress: false,
      tempItem: "",
    });
    setListState([...listStateCopy]);

    await setDelay(DELAY_IN_MS);

    listStateCopy[0].state = ElementStates.Default;
    list.current.insertToHead(new ListNode(value));
    setListState([...listStateCopy]);
    setInputValue("");
    setInsertToHeadInProgress(false);
  };

  const removeHead = async () => {
    setRemoveHeadInProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[0].removeProgress = true;
    listStateCopy[0].tempItem = listStateCopy[0].item;
    listStateCopy[0].item = "";
    setListState([...listStateCopy]);

    await setDelay(SHORT_DELAY_IN_MS);

    listStateCopy.shift();
    list.current.removeHead();
    setListState([...listStateCopy]);
    setRemoveHeadInProgress(false);
  };

  const insertTail = async (value: typeof inputValue) => {
    setInsertToTailInProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[listStateCopy.length - 1].insertProgress = true;
    listStateCopy[listStateCopy.length - 1].tempItem = value;
    setListState([...listStateCopy]);

    await setDelay(SHORT_DELAY_IN_MS);

    listStateCopy[listStateCopy.length - 1].insertProgress = false;
    listStateCopy[listStateCopy.length - 1].tempItem = "";
    listStateCopy.push({
      item: value,
      state: ElementStates.Modified,
      insertProgress: false,
      removeProgress: false,
      tempItem: "",
    });
    setListState([...listStateCopy]);

    await setDelay(DELAY_IN_MS);

    listStateCopy[listStateCopy.length - 1].state = ElementStates.Default;
    list.current.insertToTail(new ListNode(value));
    setListState([...listStateCopy]);
    setInputValue("");
    setInsertToTailInProgress(false);
  };

  const removeTail = async () => {
    setRemoveTailInProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[listStateCopy.length - 1].removeProgress = true;
    listStateCopy[listStateCopy.length - 1].tempItem =
      listStateCopy[listStateCopy.length - 1].item;
    listStateCopy[listStateCopy.length - 1].item = "";
    setListState([...listStateCopy]);

    await setDelay(SHORT_DELAY_IN_MS);

    listStateCopy.pop();
    list.current.removeTail();
    setListState([...listStateCopy]);
    setRemoveTailInProgress(false);
  };


  const insertByIndex = async (value: typeof inputValue, index: number) => {
    const listInstance = list.current;

    if (index < 0) {
      index = 0;
    }

    else if (index > listInstance.length) {
      index = listInstance.length;
    }

    setInsertAtIndexInProgress(true);
    const listStateCopy = [...listState];
    let currentIndex = 0;

    const insertNextItem = async () => {
      if (currentIndex < index + 1) {
        if (currentIndex > 0) {
          listStateCopy[currentIndex - 1].insertProgress = false;
          listStateCopy[currentIndex - 1].tempItem = "";
          listStateCopy[currentIndex - 1].state = ElementStates.Changing;
        }
        listStateCopy[currentIndex].insertProgress = true;
        listStateCopy[currentIndex].tempItem = value;
        setListState([...listStateCopy]);
        currentIndex++;

        await setDelay(SHORT_DELAY_IN_MS);
        await insertNextItem();
      } else {
        await setDelay(SHORT_DELAY_IN_MS);

        listStateCopy[currentIndex - 1].insertProgress = false;
        listStateCopy[currentIndex - 1].tempItem = "";

        if (index === listInstance.length) {
          listStateCopy.push({
            item: value,
            state: ElementStates.Modified,
            insertProgress: false,
            removeProgress: false,
            tempItem: "",
          });
        } else {
          listStateCopy.splice(index, 0, {
            item: value,
            state: ElementStates.Modified,
            insertProgress: false,
            removeProgress: false,
            tempItem: "",
          });

          for (let i = 0; i < index; i++) {
            listStateCopy[i].state = ElementStates.Default;
          }
        }

        setListState([...listStateCopy]);

        await setDelay(DELAY_IN_MS);

        listStateCopy[index].state = ElementStates.Default;
        listInstance.insertAtIndex(new ListNode(value), index);
        setListState([...listStateCopy]);
        setInputValue("");
        setInsertAtIndexInProgress(false);
      }
    };

    await insertNextItem();
  };


  const removeByIndex = async (index: number) => {
    setRemoveAtIndexInProgress(true);
    const listStateCopy = [...listState];

    const removeNextItem = async (currentIndex: number) => {
      if (currentIndex < index) {
        await setDelay(SHORT_DELAY_IN_MS);
        listStateCopy[currentIndex].state = ElementStates.Changing;
        setListState([...listStateCopy]);

        await setDelay(SHORT_DELAY_IN_MS);

        currentIndex++;
        await removeNextItem(currentIndex);
      } else if (currentIndex === index) {
        await setDelay(SHORT_DELAY_IN_MS);
        listStateCopy[currentIndex].state = ElementStates.Changing;
        setListState([...listStateCopy]);
        await setDelay(SHORT_DELAY_IN_MS);

        listStateCopy[currentIndex].state = ElementStates.Default;
        listStateCopy[currentIndex].removeProgress = true;
        listStateCopy[currentIndex].tempItem = listStateCopy[currentIndex].item;
        listStateCopy[currentIndex].item = "";
        setListState([...listStateCopy]);

        await setDelay(DELAY_IN_MS);

        listStateCopy.splice(currentIndex, 1);
        setListState([...listStateCopy]);
        setInputValue("");

        for (let i = 0; i < index; i++) {
          listStateCopy[i].state = ElementStates.Default;
        }

      } else {
        listStateCopy[currentIndex].state = ElementStates.Changing;
        setListState([...listStateCopy]);

        await setDelay(SHORT_DELAY_IN_MS);

        listStateCopy[currentIndex].state = ElementStates.Default;
        currentIndex--;
        await removeNextItem(currentIndex);
      }
    };

    let currentIndex = 0;
    await removeNextItem(currentIndex);
    await setDelay(SHORT_DELAY_IN_MS);
    setRemoveAtIndexInProgress(false);
  };


  return (
    <SolutionLayout title="Связный список">
      <section className={styles.main}>
        <form className={styles.form}>
          <div className={styles.form_value}>
            <Input
              placeholder={"Введите значение"}
              isLimitText={true}
              maxLength={4}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              value={inputValue}
            />
            <Button
              disabled={
                inputValue.length <= 0 ||
                insertAtIndexInProgress ||
                insertToTailInProgress ||
                removeHeadInProgress ||
                removeAtIndexInProgress ||
                removeTailInProgress
              }
              onClick={() => insertHead(inputValue)}
              isLoader={insertToHeadInProgress}
              text={"Добавить в head"}
            />
            <Button
              disabled={
                inputValue.length <= 0 ||
                insertAtIndexInProgress ||
                insertToHeadInProgress ||
                removeHeadInProgress ||
                removeAtIndexInProgress ||
                removeTailInProgress
              }
              onClick={() => insertTail(inputValue)}
              isLoader={insertToTailInProgress}
              text={"Добавить в tail"}
            />
            <Button
              disabled={
                listState.length < 2 ||
                insertAtIndexInProgress ||
                insertToHeadInProgress ||
                insertToTailInProgress ||
                removeAtIndexInProgress ||
                removeTailInProgress
              }
              isLoader={removeHeadInProgress}
              text={"Удалить из head"}
              onClick={removeHead}
            />
            <Button
              disabled={
                listState.length < 2 ||
                insertAtIndexInProgress ||
                insertToHeadInProgress ||
                insertToTailInProgress ||
                removeAtIndexInProgress ||
                removeHeadInProgress
              }
              isLoader={removeTailInProgress}
              text={"Удалить из tail"}
              onClick={removeTail}
            />
          </div>
          <div className={styles.form_index}>
            <Input
              type={"number"}
              placeholder={"Введите индекс"}
              max={list.current.getData().array.length - 1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (!(Number(e.target.value) < 0))
                  setInputIndex(e.target.value);
              }}
              value={inputIndex}
            />
            <Button
              disabled={
                inputValue.length <= 0 ||
                !inputIndex ||
                insertToHeadInProgress ||
                insertToTailInProgress ||
                removeHeadInProgress ||
                removeAtIndexInProgress ||
                removeTailInProgress
              }
              onClick={() => {
                if (Number(inputIndex) > listState.length) {
                  setInputIndex((listState.length - 1).toString());
                  insertByIndex(inputValue, Number(listState.length - 1));
                } else {
                  insertByIndex(inputValue, Number(inputIndex));
                }
              }}
              isLoader={insertAtIndexInProgress}
              text={"Добавить по индексу"}
            />
            <Button
              disabled={
                listState.length < 2 ||
                !inputIndex ||
                insertAtIndexInProgress ||
                insertToHeadInProgress ||
                insertToTailInProgress ||
                removeTailInProgress ||
                removeHeadInProgress
              }
              onClick={() => {
                if (Number(inputIndex) > listState.length) {
                  setInputIndex((listState.length - 1).toString());
                  removeByIndex(Number(listState.length - 1));
                } else {
                  removeByIndex(Number(inputIndex));
                }
              }}
              isLoader={removeAtIndexInProgress}
              text={"Удалить по индексу"}
            />
          </div>
        </form>
        <ul className={styles.items}>
          {listState.map((item, index, array) => {
            if (index === array.length - 1) {
              return (
                <li
                  data-testid="listItem"
                  key={index}
                >
                  <div
                    className={`${item.insertProgress
                      ? `${styles.up_circle} ${styles.up_circle__visible}`
                      : `${styles.up_circle}`
                      }`}
                  >
                    <Circle
                      isSmall={true}
                      letter={item.tempItem}
                      state={ElementStates.Changing}
                    />
                  </div>
                  <div className={styles.circle}>
                    <Circle
                      head={item.insertProgress ? "" : index === 0 ? "head" : ""}
                      index={index}
                      state={item.state}
                      letter={item.item}
                      tail={item.removeProgress ? "" : "tail"}
                    />
                  </div>
                  <div
                    className={`${item.removeProgress
                      ? `${styles.down_circle} ${styles.down_circle__visible}`
                      : `${styles.down_circle}`
                      }`}
                  >
                    <Circle
                      isSmall={true}
                      letter={item.tempItem}
                      state={ElementStates.Changing}
                    />
                  </div>
                </li>
              );
            }
            return (
              <li
                data-testid="listItem"
                className={styles.listItem}
                key={index}
              >
                <div
                  className={`${item.insertProgress
                    ? `${styles.up_circle} ${styles.up_circle__visible}`
                    : `${styles.up_circle}`
                    }`}
                >
                  <Circle
                    isSmall={true}
                    letter={item.tempItem}
                    state={ElementStates.Changing}
                  />
                </div>
                <div className={styles.circle}>
                  <Circle
                    head={item.insertProgress ? "" : index === 0 ? "head" : ""}
                    index={index}
                    state={item.state}
                    letter={item.item}
                  />
                  <div className={styles.arrow_icon}>
                    <ArrowIcon />
                  </div>
                </div>

                <div
                  className={`${item.removeProgress
                    ? `${styles.down_circle} ${styles.down_circle__visible}`
                    : `${styles.down_circle}`
                    }`}
                >
                  <Circle
                    isSmall={true}
                    letter={item.tempItem}
                    state={ElementStates.Changing}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
