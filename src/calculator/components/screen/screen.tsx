import * as React from 'react';
import './screen.css';

export interface Props {
  operation?: string;
  result?: string;
}

export default function Screen({ operation = '', result = '' }: Props) {
  return (
    <div className="flex flex-col">
      <input
        id="operation"
        type="text"
        readOnly={true}
        value={operationToString(operation)}
      />
      <input
        id="result"
        type="text"
        readOnly={true}
        value={isNaN(Number(result)) ? 'error' : result}
      />
    </div>
  );
}

function operationToString(operation: string) {
  return operation.replace(/\*/g, 'x');
}
