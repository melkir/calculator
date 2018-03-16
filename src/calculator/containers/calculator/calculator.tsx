import * as React from 'react';

import { Screen, Button } from '../../components';

export const PanelLabels = {
  left: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'C'],
  right: ['/', '*', '-', '+']
};

export interface Props {
  onCompute?: () => void;
  onClear?: () => void;
}

export function Calculator(props: Props) {
  return (
    <div className="max-w-lg m-auto rounded overflow-hidden shadow-md mt-8 border">
      <div className="p-2">
        <Screen />
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
                onClick={() => console.log('key', value)}
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
                onClick={() => console.log('operator', value)}
              />
            );
          })}
          <Button
            className="w-full bg-grey-light hover:bg-grey h-12"
            value="="
            onClick={() => console.log('operator', 'equal')}
          />
        </div>
      </div>
    </div>
  );
}

// Handle the special case to correctly display the operator multiply
function operatorToString(operator: string): string {
  return operator === '*' ? 'x' : operator;
}
