import { Digit, Operator } from '../../models';

export const ADD_DIGIT = '[Calculator] Add digit';
export const ADD_OPERATOR = '[Calculator] Add operator';
export const ADD_COMMA = '[Calculator] Add comma';

export class AddDigit {
  readonly type = ADD_DIGIT;
  constructor(public payload: Digit) {}
}

export class AddOperator {
  readonly type = ADD_OPERATOR;
  constructor(public payload: Operator) {}
}

export class AddComma {
  readonly type = ADD_COMMA;
}

export const CLEAR_SCREEN = '[Calculator] Clear screen';
export const COMPUTE_RESULT = '[Calculator] Compute the result';

export class ClearScreen {
  readonly type = CLEAR_SCREEN;
}

export class ComputeResult {
  readonly type = COMPUTE_RESULT;
}

export const UNLEASH_MONKEYS = '[Calculator] Unleash the monkeys';
export const STOP_MONKEYS = '[Calculator] Stop the monkeys';

export class UnleashMonkey {
  readonly type = UNLEASH_MONKEYS;
}

export class StopMonkey {
  readonly type = STOP_MONKEYS;
}

export type CalculatorActions =
  | AddDigit
  | AddOperator
  | AddComma
  | ClearScreen
  | ComputeResult
  | UnleashMonkey
  | StopMonkey;
