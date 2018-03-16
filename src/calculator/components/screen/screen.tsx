import * as React from 'react';
import './screen.css';

export interface Props {
  operation: string;
  result: string;
}

export function Screen({ operation = '', result = '' }: Props) {
  return (
    <div className="flex flex-col">
      <input type="text" readOnly={true} value={operation} />
      <input
        type="text"
        readOnly={true}
        value={isNaN(Number(result)) ? 'error' : result}
      />
    </div>
  );
}
