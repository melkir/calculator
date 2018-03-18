import { Parser } from 'expr-eval';
import * as fromCalculator from '../actions/calculator';
import { CalculatorState } from '../types';

export const initialState: CalculatorState = {
  operation: '',
  result: '',
  previousResults: [],
  historyVisible: false,
  isMonkeysFreed: false,
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
    case fromCalculator.TOGGLE_MONKEYS_STATUS: {
      const isMonkeysFreed = !state.isMonkeysFreed;
      return { ...state, isMonkeysFreed };
    }
  }
  return state;
}

export function compute(operation: string): number {
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
    return Parser.evaluate(operation);
  } catch (error) {
    return NaN;
  }
}

function updatePreviousResults(
  previousResults: Array<string>,
  result: string
): Array<string> {
  return result === NaN.toString()
    ? previousResults
    : [...previousResults, result];
}
