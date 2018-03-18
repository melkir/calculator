import * as React from 'react';
import { Screen } from '../screen/screen';
import { Button } from '../button/button';
import { Keyboard } from '../keyboard/keyboard';

export const PanelLabels = {
  left: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'C'],
  right: ['/', 'x', '-', '+'],
};

export interface Props {
  onToggleMonkeys: () => void;
  onTapKey: (key: string) => void;
  onCompute: () => void;
  // onToggleHistory: () => void;
  operation: string;
  result: string;
}

export function Calculator(props: Props) {
  const { onTapKey, onToggleMonkeys, onCompute, result, operation } = props;
  return (
    <div className="max-w-lg m-auto rounded overflow-hidden shadow-md mt-8 border">
      <div className="p-2">
        <Screen operation={operation} result={result} />
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
                onClick={() => onTapKey(value)}
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
                value={value}
                onClick={() => onTapKey(value)}
              />
            );
          })}
          <Button
            className="w-full bg-grey-light hover:bg-grey h-12"
            value="="
            onClick={() => onCompute()}
          />
        </div>
      </div>
      <Keyboard onKeySpace={onToggleMonkeys} />
    </div>
  );
}
