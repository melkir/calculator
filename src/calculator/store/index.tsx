import { createStore } from 'redux';
import { CalculatorState } from './types';
import { reducer, initialState } from './reducers';

export * from './actions';
export * from './reducers';

export const store = createStore<CalculatorState>(reducer, initialState);
