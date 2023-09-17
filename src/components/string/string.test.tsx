
import { reverseString, setDelay } from "../../utils/utils";


describe('reverseString', () => {

  it('should reverse a string with odd length', () => {
    const input = 'world';
    const expectedOutput = 'dlrow';
    const result = reverseString(input);
    expect(result).toBe(expectedOutput);
  });


  it('should reverse a string with even length', () => {
    const input = 'qwerty';
    const expectedOutput = 'ytrewq';
    const result = reverseString(input);
    expect(result).toBe(expectedOutput);
  });


  it('should reverse a single-character string', () => {
    const input = 'a';
    const expectedOutput = 'a';
    const result = reverseString(input);
    expect(result).toBe(expectedOutput);
  });

  it('should reverse an empty string', () => {
    const input = '';
    const expectedOutput = '';
    const result = reverseString(input);
    expect(result).toBe(expectedOutput);
  });
});
