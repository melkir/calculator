import * as fromActions from '../actions';
import * as fromCalculator from '../reducers';

describe('CalculatorReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCalculator;
      // tslint:disable-next-line no-any
      const action = {} as any;
      const state = fromCalculator.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
  describe('ADD_DIGIT action', () => {
    it('should add the digit to the operation label', () => {
      const { initialState } = fromCalculator;
      const action = new fromActions.AddDigit(5);
      const state = fromCalculator.reducer(initialState, action);

      expect(state.operation).toBe('5');
    });
  });
  describe('ADD_OPERATOR action', () => {
    it('should add the operator to the operation label', () => {
      const { initialState } = fromCalculator;
      const action = new fromActions.AddOperator('-');
      const state = fromCalculator.reducer(initialState, action);

      expect(state.operation).toBe('-');
    });
  });
  describe('ADD_COMMA action', () => {
    it('should add the comma to the operation label', () => {
      const { initialState } = fromCalculator;
      const action = new fromActions.AddComma();
      const state = fromCalculator.reducer(initialState, action);

      expect(state.operation).toBe('.');
    });
  });
  describe('CLEAR_SCREEN action', () => {
    it('should reset the operation label and the result label', () => {
      const { initialState } = fromCalculator;
      const action = new fromActions.ClearScreen();
      const state = fromCalculator.reducer(initialState, action);

      expect(state.operation).toBe('');
      expect(state.result).toBe('');
    });
  });
  describe('COMPUTE_RESULT action', () => {
    it('should compute the result of the current operation', () => {
      const { initialState } = fromCalculator;
      const operation = '5*8+3-1';
      const previousState = { ...initialState, operation };
      const action = new fromActions.ComputeResult();
      const state = fromCalculator.reducer(previousState, action);

      expect(state.result).toBe('42');
    });
    it('should compute NaN if the current operation is invalid', () => {
      const { initialState } = fromCalculator;
      const operation = '5*/8';
      const previousState = { ...initialState, operation };
      const action = new fromActions.ComputeResult();
      const state = fromCalculator.reducer(previousState, action);

      expect(state.result).toBe(NaN.toString());
    });
    it('should update the previous results for a valid operation', () => {
      const { initialState } = fromCalculator;
      const operation = '5*8+3-1';
      const previousResults = ['1', '2'];
      const previousState = { ...initialState, operation, previousResults };
      const action = new fromActions.ComputeResult();
      const state = fromCalculator.reducer(previousState, action);

      expect(state.previousResults).toEqual([...previousResults, '42']);
    });
    it('should not update the previous results for an incorrect operation', () => {
      const { initialState } = fromCalculator;
      const operation = '5*/8';
      const previousResults = ['1', '2'];
      const previousState = { ...initialState, operation, previousResults };
      const action = new fromActions.ComputeResult();
      const state = fromCalculator.reducer(previousState, action);

      expect(state.previousResults).toBe(previousResults);
    });
  });
  describe('UNLEASH_MONKEYS action', () => {
    it('should generate multiple valid random computes', () => {
      const { initialState } = fromCalculator;
      const action = new fromActions.UnleashMonkey();
      const state = fromCalculator.reducer(initialState, action);

      expect(state).toBeFalsy();
    });
  });
  describe('STOP_MONKEYS action', () => {
    it('should stop generating random computes', () => {
      const { initialState } = fromCalculator;
      const action = new fromActions.StopMonkey();
      const state = fromCalculator.reducer(initialState, action);

      expect(state).toBeFalsy();
    });
  });
});
