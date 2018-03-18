import * as fromCalculator from './calculator';

describe('Calculator Actions', () => {
  describe('AddDigit', () => {
    it('should create an action', () => {
      const payload = '1';
      const action = new fromCalculator.AddDigit(payload);
      expect({ ...action }).toEqual({
        type: fromCalculator.ADD_DIGIT,
        payload,
      });
    });
  });
  describe('AddOperator', () => {
    it('should create an action', () => {
      const payload = '+';
      const action = new fromCalculator.AddOperator(payload);
      expect({ ...action }).toEqual({
        type: fromCalculator.ADD_OPERATOR,
        payload,
      });
    });
  });
  describe('AddComma', () => {
    it('should create an action', () => {
      const action = new fromCalculator.AddComma();
      expect({ ...action }).toEqual({
        type: fromCalculator.ADD_COMMA,
      });
    });
  });
  describe('ClearScreen', () => {
    it('should create an action', () => {
      const action = new fromCalculator.ClearScreen();
      expect({ ...action }).toEqual({
        type: fromCalculator.CLEAR_SCREEN,
      });
    });
  });
  describe('ComputeResult', () => {
    it('should create an action', () => {
      const action = new fromCalculator.ComputeResult();
      expect({ ...action }).toEqual({
        type: fromCalculator.COMPUTE_RESULT,
      });
    });
  });
  describe('UnleashMonkey', () => {
    it('should create an action', () => {
      const action = new fromCalculator.ToggleMonkeysStatus();
      expect({ ...action }).toEqual({
        type: fromCalculator.TOGGLE_MONKEYS_STATUS,
      });
    });
  });
});
