import { store, compute } from './store';
import * as actions from './store/actions/';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['/', 'x', '-', '+'];
const DIGITS_COMMA = [...DIGITS, '.'];

export interface MonkeysProps {
  timer: NodeJS.Timer | null;
  toggleMonkeys: () => void;
  enclose: () => void;
  unleash: () => void;
}

export class Monkeys implements MonkeysProps {
  timer: NodeJS.Timer | null;

  public toggleMonkeys(): void {
    const { isMonkeysFreed } = store.getState();
    store.dispatch({ ...new actions.ToggleMonkeysStatus() });
    isMonkeysFreed ? this.enclose() : this.unleash();
  }

  public unleash(): void {
    if (this.timer != null) {
      return;
    }
    this.timer = setInterval(() => this.simulateMonkeyActions(), 100);
  }

  public enclose(): void {
    if (this.timer == null) {
      return;
    }
    clearInterval(this.timer);
    this.timer = null;
  }

  private simulateMonkeyActions() {
    store.dispatch({ ...new actions.ClearScreen() });
    this.generateValidRandomOperation()
      .split('')
      .forEach(key => store.dispatch({ ...actions.onTapKey(key) }));
    store.dispatch({ ...new actions.ComputeResult() });
  }

  private generateValidRandomOperation(maxNumberOfRetry: number = 100): string {
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

  private getRandomOperation(): string {
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

  private getRandomDigits(numberOfDigits: number): string {
    let result = '';
    for (let i = 0; i < numberOfDigits; i++) {
      result +=
        DIGITS_COMMA[this.getRandomIntInclusive(0, DIGITS_COMMA.length - 1)];
    }
    return result;
  }

  private getRandomOperator(): string {
    return OPERATORS[this.getRandomIntInclusive(0, OPERATORS.length - 1)];
  }

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
