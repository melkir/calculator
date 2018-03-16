export interface CalculatorState {
  operation: string;
  result: string;
  previousResults: Array<string>;
  historyVisible: boolean;
}
