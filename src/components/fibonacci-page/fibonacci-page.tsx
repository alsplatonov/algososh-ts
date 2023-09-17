import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fib.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils/utils";

export const FibonacciPage: FC = () => {
  const [fibArr, setFibArr] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<number | string>("");

  const [disableButton, setDisableButton] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(evt.target.value);

    if (value && !isNaN(value)) {
      setDisableButton(false);
      if (value < 20) {
        setInputValue(value);
      }
    } else {
      if (value === 0) {
        setInputValue(0);
      }
      setDisableButton(true);
    }
  };

  const fibonacci = async (num: number) => {
    const arrFib: number[] = [];

    setIsLoading(true);
    setDisableInput(true);

    for (let i = 0; i <= num; i++) {
      if (i === 0) {
        arrFib.push(0);
        setFibArr([...arrFib]);
      } else if (i === 1) {
        arrFib.push(1);
        setFibArr([...arrFib]);
      } else if (i > 1) {
        arrFib.push(arrFib[i - 2] + arrFib[i - 1]);
        setFibArr([...arrFib]);
      }

      if (i === num) {
        setIsLoading(false);
        setDisableButton(false);
        setDisableInput(false);
      }
      await setDelay(SHORT_DELAY_IN_MS); //пауза для отображения результата пользователю на каждом шаге
    }
  };

  const onClick = () => {
    fibonacci(inputValue as number);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          data-testid="input"
          extraClass={styles.input}
          maxLength={19}
          max={19}
          min={1}
          type={"number"}
          placeholder="Введите число"
          isLimitText={true}
          id="fibonacci"
          onChange={onChange}
          value={inputValue || ""}
          disabled={disableInput}
        />
        <Button
          data-testid="calculate-button"
          onClick={onClick}
          text={"Рассчитать"}
          disabled={disableButton}
          isLoader={isLoading}
        />
      </form>
      <div className={styles.circles}>
        {fibArr.map((item, index) => {
          return <Circle data-testid="circle" letter={"" + item} key={index} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
