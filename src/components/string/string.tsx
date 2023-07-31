import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseString, setDelay } from "../../utils/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

export interface IString {
  letter: string;
  state: ElementStates;
}

export const StringComponent: FC = () => {
  const [inputStr, setInputStr] = useState("");
  const [outputStr, setOutputStr] = useState<IString[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputStr(evt.target.value);
  };


  const onClick = async () => {
    setInProgress(true);

    const outputArr: IString[] = [];
    const reversedString = reverseString(inputStr); //разворот строки

    for (let i = 0; i < inputStr.length; i++) {
      const char = {
        letter: inputStr[i],
        state: ElementStates.Default,
      };
      outputArr.push(char);
    }

    setOutputStr([...outputArr]);

    for (let i = 0; i < inputStr.length; i++) {
      await setDelay(DELAY_IN_MS);
      outputArr[i].state = ElementStates.Changing;
      setOutputStr([...outputArr]);

      await setDelay(DELAY_IN_MS);
      outputArr[i].letter = reversedString[i];
      outputArr[i].state = ElementStates.Modified;
      setOutputStr([...outputArr]);
    }

    await setDelay(DELAY_IN_MS);
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          extraClass={styles.input}
          onChange={onChange}
          maxLength={11}
          max={1}
          min={1}
          placeholder="Введите текст"
          isLimitText={true}
          id="string"
          value={inputStr}
        />
        <Button
          onClick={onClick}
          text={"Развернуть"}
          disabled={inputStr.length > 0 ? false : true}
          isLoader={inProgress}
        />
      </form>
      <div className={styles.circles}>
        {outputStr.map((item, index) => (
          <Circle state={item?.state} letter={item?.letter} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
