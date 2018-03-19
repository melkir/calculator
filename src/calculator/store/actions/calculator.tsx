import { Action } from 'redux';

import { Digit, Operator } from '../../models';

export const ADD_DIGIT = '[Calculator] Add digit';
export const ADD_OPERATOR = '[Calculator] Add operator';
export const ADD_COMMA = '[Calculator] Add comma';

export class AddDigit implements Action {
  readonly type = ADD_DIGIT;
  constructor(public payload: Digit) {}
}

export class AddOperator implements Action {
  readonly type = ADD_OPERATOR;
  constructor(public payload: Operator) {}
}

export class AddComma implements Action {
  readonly type = ADD_COMMA;
}

export const CLEAR_SCREEN = '[Calculator] Clear screen';
export const COMPUTE_RESULT = '[Calculator] Compute the result';

export class ClearScreen implements Action {
  readonly type = CLEAR_SCREEN;
}

export class ComputeResult implements Action {
  readonly type = COMPUTE_RESULT;
}

export const TOGGLE_MONKEYS_STATUS = '[Calculator] Toggle monkeys status';

export class ToggleMonkeysStatus implements Action {
  readonly type = TOGGLE_MONKEYS_STATUS;
}

export function onTapKey(key: string) {
  const digitRegex = /^[0-9]$/;
  const operatorRegex = /^[x+\-\/]$/;

  if (digitRegex.test(key)) {
    return new AddDigit(key as Digit);
  } else if (operatorRegex.test(key)) {
    const operator = key === 'x' ? '*' : (key as Operator);
    return new AddOperator(operator);
  } else if ('.' === key) {
    return new AddComma();
  } else if ('=' === key) {
    return new ComputeResult();
  } else if ('C' === key) {
    return new ClearScreen();
  } else {
    throw `Invalid key pressed ${key}`;
  }
}

export type CalculatorActions =
  | AddDigit
  | AddOperator
  | AddComma
  | ClearScreen
  | ComputeResult
  | ToggleMonkeysStatus;
