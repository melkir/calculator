import * as fromCalculator from '../actions/calculator';
import { CalculatorState } from '../types';

export const initialState: CalculatorState = {
  operation: '',
  result: '',
  previousResults: [],
  historyVisible: false,
};

export function reducer(
  state: CalculatorState = initialState,
  action: fromCalculator.CalculatorActions
): CalculatorState {
  switch (action.type) {
    case fromCalculator.ADD_COMMA: {
      const operation = state.operation + '.';
      return { ...state, operation };
    }
    case fromCalculator.ADD_DIGIT:
    case fromCalculator.ADD_OPERATOR: {
      const operation = state.operation + action.payload;
      return { ...state, operation };
    }
    case fromCalculator.COMPUTE_RESULT: {
      const result = '' + compute(state.operation);
      const previousResults = updatePreviousResults(
        state.previousResults,
        result
      );
      return { ...state, result, previousResults };
    }
    case fromCalculator.CLEAR_SCREEN: {
      return { ...state, operation: '', result: '' };
    }
    case fromCalculator.UNLEASH_MONKEYS: {
      const operation = generateValidRandomOperation();
      // TODO: Generate random operations and display the results
      return { ...state, operation };
    }
    case fromCalculator.STOP_MONKEYS: {
      // TODO: Stop generating random operations and clear the screen
    }
  }
  return state;
}

function updatePreviousResults(
  previousResults: Array<string>,
  result: string
): Array<string> {
  return result === NaN.toString()
    ? previousResults
    : [...previousResults, result];
}

function compute(operation: string): number | string {
  const isEmptyOperation = operation.length === 0;

  if (isEmptyOperation) {
    return NaN;
  }

  // strip anything other than digits, (), -+/* and .
  const expression = operation.replace(/[^-()\d/*+.]/g, '');
  const isInvalidExpression = expression.length === 0;

  if (isInvalidExpression) {
    return NaN;
  }

  try {
    // the expression is sanitized, it is safe to disable the lint warning
    // tslint:disable-next-line no-eval
    return eval(expression);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NaN;
    } else {
      // ensure that other types of exceptions are not suppressed
      throw error;
    }
  }
}

export const BUTTONS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '/',
  '*', // 'x'
  '-',
  '+',
  '.',
];

function generateValidRandomOperation(
  maxOperationLength: number = 10,
  maxNumberOfTests: number = 1000000
): string {
  let isValidOperation = false;
  let validOperation = '';
  let count = 0;

  while (!isValidOperation && count < maxNumberOfTests) {
    const randomOperation = getRandomOperation(maxOperationLength);
    isValidOperation = !isNaN(Number(compute(randomOperation)));
    ++count;
  }

  if (count >= maxNumberOfTests) {
    throw `Unable to find a valid random operation with ${maxNumberOfTests} tests`;
  }

  return validOperation;
}

function getRandomOperation(maxOperationLength: number): string {
  const operationLength = getRandomIntInclusive(1, maxOperationLength);
  let result = '';
  for (let index = 0; index < operationLength; index++) {
    result += BUTTONS[index];
  }
  return result;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
