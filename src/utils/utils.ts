
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
