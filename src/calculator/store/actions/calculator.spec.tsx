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
  describe('onTapKey', () => {
    it('should create digit action on [0-9] keys', () => {
      const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      keys.forEach(digit => {
        const action = fromCalculator.onTapKey(digit);
        expect({ ...action }).toEqual({
          type: fromCalculator.ADD_DIGIT,
          payload: digit,
        });
      });
    });
    it('should create operator action on [+-/] keys', () => {
      const keys = ['/', 'x', '-', '+'];
      keys.forEach(key => {
        const action = fromCalculator.onTapKey(key);
        expect({ ...action }).toEqual({
          type: fromCalculator.ADD_OPERATOR,
          payload: key === 'x' ? '*' : key,
        });
      });
    });
    it('should create clear action on (C) key', () => {
      const action = fromCalculator.onTapKey('C');
      expect({ ...action }).toEqual({ type: fromCalculator.CLEAR_SCREEN });
    });
    it('should create compute action on (=) key', () => {
      const action = fromCalculator.onTapKey('=');
      expect({ ...action }).toEqual({ type: fromCalculator.COMPUTE_RESULT });
    });
    it('should create comma action on (.) key', () => {
      const action = fromCalculator.onTapKey('.');
      expect({ ...action }).toEqual({ type: fromCalculator.ADD_COMMA });
    });
    it('should allow (x) or (*) key', () => {
      const action = fromCalculator.onTapKey('*');
      expect({ ...action }).toEqual({
        type: fromCalculator.ADD_OPERATOR,
        payload: '*',
      });
    });
  });
});
