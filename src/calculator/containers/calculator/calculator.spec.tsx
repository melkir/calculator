import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Calculator } from './calculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calculator />, div);
});
