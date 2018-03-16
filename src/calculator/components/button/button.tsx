import * as React from 'react';
import './button.css';

export interface Props {
  value: string;
  className?: string;
  onClick: (value: string) => void;
}

export function Button({ value, className, onClick }: Props) {
  return (
    <button className={`btn ${className}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
}
