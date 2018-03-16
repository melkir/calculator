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
    onCompute: () => dispatch({ ...new actions.ComputeResult() }),
    onClear: () => dispatch({ ...new actions.ClearScreen() }),
    onDigit: (digit: Digit) => dispatch({ ...new actions.AddDigit(digit) }),
    onOperator: (operator: Operator) =>
      dispatch({ ...new actions.AddOperator(operator) }),
    onComma: () => dispatch({ ...new actions.AddComma() }),
    onUnleashMonkeys: () => dispatch({ ...new actions.UnleashMonkey() }),
    onStopMonkeys: () => dispatch({ ...new actions.StopMonkey() }),
    // onToggleHistory: () => store.dispatch({...new actions.ToggleHistory()}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
