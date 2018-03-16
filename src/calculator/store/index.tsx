import { createStore } from 'redux';
import { CalculatorState } from './types';
import { reducer, initialState } from './reducers';

export * from './actions';
export * from './reducers';

// tslint:disable-next-line no-any
declare var window: any;

export const store = createStore<CalculatorState>(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
