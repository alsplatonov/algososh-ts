import { bubbleSort, selectSort } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";


describe('Bubble Sort', () => {
  it('should correctly sort an empty array', () => {
    const emptyArray: Array<{ value: number, state: ElementStates }> = [];
    //ожидаемый результат
    const sortedArray = [...emptyArray].sort();
    const bubbleSortGenerator = bubbleSort(emptyArray, Direction.Ascending);

    let result = bubbleSortGenerator.next();
    while (!result.done) {
      result = bubbleSortGenerator.next();
    }

    expect(emptyArray).toEqual(sortedArray);
  });

  it('should correctly sort an array with one element', () => {
    const oneElementArray = [{ value: 42, state: ElementStates.Default }];
    const sortedArray = [...oneElementArray].sort((a, b) => a.value - b.value);
    const bubbleSortGenerator = bubbleSort(oneElementArray, Direction.Ascending);

    let result = bubbleSortGenerator.next();
    while (!result.done) {
      result = bubbleSortGenerator.next();
    }

    expect(oneElementArray).toEqual(sortedArray);
  });

  it('should correctly sort an array with multiple elements', () => {
    const unsortedArray = [
      { value: 5, state: ElementStates.Default },
      { value: 2, state: ElementStates.Default },
      { value: 9, state: ElementStates.Default },
      { value: 1, state: ElementStates.Default },
    ];

    const sortedArray = [...unsortedArray].sort((a, b) => a.value - b.value);

    const bubbleSortGenerator = bubbleSort([...unsortedArray], Direction.Ascending);

    let result = bubbleSortGenerator.next();
    const sortedArrayData = [];

    while (!result.done) {
      const currentSortedArray = [...result.value];
      sortedArrayData.push(currentSortedArray);

      result = bubbleSortGenerator.next();
    }

    expect(sortedArrayData[sortedArrayData.length - 1]).toEqual(sortedArray);
  });

});



describe('Selection Sort', () => {
  it('should correctly sort an empty array', () => {
    const emptyArray: Array<{ value: number, state: ElementStates }> = [];

    const sortedArray = [...emptyArray].sort();
    const selectSortGenerator = selectSort(emptyArray, Direction.Ascending);

    let result = selectSortGenerator.next();
    while (!result.done) {
      result = selectSortGenerator.next();
    }

    expect(emptyArray).toEqual(sortedArray);
  });

  it('should correctly sort an array with one element', () => {
    const oneElementArray = [{ value: 42, state: ElementStates.Default }];
    const sortedArray = [...oneElementArray].sort((a, b) => a.value - b.value);
    const selectSortGenerator = selectSort(oneElementArray, Direction.Ascending);

    let result = selectSortGenerator.next();
    while (!result.done) {
      result = selectSortGenerator.next();
    }

    expect(oneElementArray).toEqual(sortedArray);
  });

  it('should correctly sort an array with multiple elements', () => {
    const unsortedArray = [
      { value: 5, state: ElementStates.Default },
      { value: 2, state: ElementStates.Default },
      { value: 9, state: ElementStates.Default },
      { value: 1, state: ElementStates.Default },
    ];

    const sortedArray = [...unsortedArray].sort((a, b) => a.value - b.value);
    const selectSortGenerator = selectSort([...unsortedArray], Direction.Ascending);

    let result = selectSortGenerator.next();
    const sortedArrayData = [];

    while (!result.done) {
      const currentSortedArray = [...result.value];
      sortedArrayData.push(currentSortedArray);

      result = selectSortGenerator.next();
    }

    expect(sortedArrayData[sortedArrayData.length - 1]).toEqual(sortedArray);
  });
});
