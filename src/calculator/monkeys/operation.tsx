import { compute } from '../store';

export const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const OPERATORS = ['/', 'x', '-', '+'];
export const DIGITS_COMMA = [...DIGITS, '.'];

export class Operation {
  public static generateValidRandomOperation(
    maxNumberOfRetry: number = 100
  ): string {
    let validOperation = '';
    let count = 0;
    let operationResult;
    while (count < maxNumberOfRetry) {
      const randomOperation = this.getRandomOperation();
      operationResult = compute(randomOperation);
      if (!isNaN(Number(operationResult))) {
        validOperation = randomOperation;
        break;
      }
      ++count;
    }

    if (count >= maxNumberOfRetry || validOperation === '') {
      throw `Unable to find a valid random operation with ${maxNumberOfRetry} tests`;
    }

    return validOperation;
  }

  private static getRandomOperation(): string {
    const numberOfLeftDigits = this.getRandomIntInclusive(1, 5);
    const numberOfRightDigits = this.getRandomIntInclusive(1, 5);
    const numberOfNumbers = this.getRandomIntInclusive(1, 3);

    let result = this.getRandomDigits(numberOfLeftDigits);
    for (let i = 0; i < numberOfNumbers; i++) {
      result += this.getRandomOperator();
      result += this.getRandomDigits(numberOfRightDigits);
    }

    return result;
  }

  private static getRandomDigits(numberOfDigits: number): string {
    let result = '';
    for (let i = 0; i < numberOfDigits; i++) {
      result +=
        DIGITS_COMMA[this.getRandomIntInclusive(0, DIGITS_COMMA.length - 1)];
    }
    return result;
  }

  private static getRandomOperator(): string {
    return OPERATORS[this.getRandomIntInclusive(0, OPERATORS.length - 1)];
  }

  private static getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
