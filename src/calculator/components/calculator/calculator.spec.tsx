import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { Calculator, PanelLabels, Props } from './calculator';
import Screen from '../screen/screen';

describe('Calculator component', () => {
  let wrapper: ShallowWrapper<Props>;
  const onTapKey = jest.fn();
  const onCompute = jest.fn();

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(
      <Calculator
        onCompute={onCompute}
        onTapKey={onTapKey}
        operation={''}
        result={''}
      />
    );
  });

  afterEach(() => {
    onTapKey.mockReset();
    onCompute.mockReset();
  });

  it('should display the calculator with the screen', () => {
    const screen = wrapper.find(Screen);
    expect(screen.exists()).toBeTruthy();
  });

  it('should display the calculator with the buttons', () => {
    [...PanelLabels.left, ...PanelLabels.right].forEach(label => {
      const button = wrapper.find({ value: label });
      expect(button.exists()).toBeTruthy();
    });
  });

  it('should call onTapKey method when a button is pressed', () => {
    const keys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '+',
      '-',
      'x',
      '/',
      '.',
    ];
    keys.forEach(key => {
      const clear = wrapper.find({ value: key });
      clear.simulate('click');
    });
    expect(onTapKey.mock.calls.length).toBe(keys.length);
  });

  it('should call onCompute method when (=) button is pressed', () => {
    const compute = wrapper.find({ value: '=' });
    compute.simulate('click');
    expect(onCompute).toHaveBeenCalled();
  });
});
