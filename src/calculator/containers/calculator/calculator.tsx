import { Calculator } from '../../components';

import * as actions from '../../store/actions/';
import { CalculatorState } from '../../store/types';
import { connect, Dispatch } from 'react-redux';

import { Operator, Digit } from '../../models';

export function mapStateToProps({
  operation,
  result,
  previousResults,
  historyVisible,
}: CalculatorState) {
  return {
    operation,
    result,
    previousResults,
    historyVisible,
  };
}

export function mapDispatchToProps(
  dispatch: Dispatch<actions.CalculatorActions>
) {
  return {
    onTapKey: (key: string) => onTapKey(dispatch, key),
    onCompute: () => dispatch({ ...new actions.ComputeResult() }),
    onClear: () => dispatch({ ...new actions.ClearScreen() }),
    onDigit: (digit: string) =>
      dispatch({ ...new actions.AddDigit(digit as Digit) }),
    onOperator: (operator: string) =>
      dispatch({ ...new actions.AddOperator(operator as Operator) }),
    onComma: () => dispatch({ ...new actions.AddComma() }),
    onToggleMonkeys: () => dispatch({ ...new actions.ToggleMonkeysStatus() }),
    // onToggleHistory: () => store.dispatch({...new actions.ToggleHistory()}),
  };
}

export function onTapKey(
  dispatch: Dispatch<actions.CalculatorActions>,
  key: string
) {
  const digitRegex = /^[0-9]$/;
  const operatorRegex = /^[\x\+\-\/]$/;
  const {
    onDigit,
    onOperator,
    onComma,
    onCompute,
    onClear,
  } = mapDispatchToProps(dispatch);

  if (digitRegex.test(key)) {
    onDigit(key);
  } else if (operatorRegex.test(key)) {
    onOperator(key === 'x' ? '*' : key);
  } else if ('.' === key) {
    onComma();
  } else if ('=' === key) {
    onCompute();
  } else if ('C' === key) {
    onClear();
  } else {
    throw `Invalid key pressed ${key}`;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
