import * as React from 'react';
import { Screen } from '../../components/screen/screen';
import { Button } from '../../components/button/button';

export const PanelLabels = {
  left: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'C'],
  right: ['/', '*', '-', '+'],
};

export interface Props {
  onCompute: () => void;
  onClear: () => void;
  onDigit: (digit: string) => void;
  onOperator: (operator: string) => void;
  onComma: () => void;
  onUnleashMonkeys: () => void;
  onStopMonkeys: () => void;
  // onToggleHistory: () => void;
  operation: string;
  result: string;
}

export function Calculator(props: Props) {
  return (
    <div className="max-w-lg m-auto rounded overflow-hidden shadow-md mt-8 border">
      <div className="p-2">
        <Screen operation={props.operation} result={props.result} />
      </div>
      <div className="flex flex-row">
        {/* Left Panel */}
        <div className="flex flex-wrap w-2/3">
          {PanelLabels.left.map(value => {
            return (
              <Button
                key={value}
                className="w-1/3 bg-grey-lightest hover:bg-grey-lighter h-15"
                value={value}
                onClick={() => onTapKey(value, props)}
              />
            );
          })}
        </div>
        {/* Right Panel */}
        <div className="flex flex-wrap w-1/3">
          {PanelLabels.right.map(value => {
            return (
              <Button
                className="w-full bg-grey-lighter hover:bg-grey-light h-12"
                key={value}
                value={operatorToString(value)}
                onClick={() => onTapKey(value, props)}
              />
            );
          })}
          <Button
            className="w-full bg-grey-light hover:bg-grey h-12"
            value="="
            onClick={() => onTapKey('=', props)}
          />
        </div>
      </div>
    </div>
  );
}

function onTapKey(
  key: string,
  { onDigit, onOperator, onComma, onCompute, onClear }: Props
) {
  const digitRegex = /^[0-9]$/;
  const operatorRegex = /^[\*\+\-\/]$/;

  if (digitRegex.test(key)) {
    onDigit(key);
  } else if (operatorRegex.test(key)) {
    onOperator(key);
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

// Handle the special case to correctly display the operator multiply
function operatorToString(operator: string): string {
  return operator === '*' ? 'x' : operator;
}
