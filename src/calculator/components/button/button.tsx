import * as React from 'react';
import './button.css';

export interface Props {
  value: string;
  className?: string;
  onClick: (value: string) => void;
}

export default function Button({ value, className, onClick }: Props) {
  return (
    <button
      className={`btn ${className}`}
      onClick={() => onClick(value)}
      data-btn={value}
    >
      {value}
    </button>
  );
}
