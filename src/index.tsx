import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './calculator/store';

import Calculator from './calculator/containers/calculator/calculator';

ReactDOM.render(
  <Provider store={store}>
    <Calculator />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
