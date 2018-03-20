import { Calculator } from '../../components';

import * as actions from '../../store/actions/';
import { CalculatorState } from '../../store/types';
import { connect, Dispatch } from 'react-redux';

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
    onTapKey: (key: string) => dispatch({ ...actions.onTapKey(key) }),
    onCompute: () => dispatch({ ...new actions.ComputeResult() }),
    // onToggleHistory: () => store.dispatch({...new actions.ToggleHistory()}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
