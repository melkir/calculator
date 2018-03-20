import * as React from 'react';
import * as enzyme from 'enzyme';
import Keyboard from './keyboard';

describe('Keyboard component', () => {
  it('should renders an empty node', () => {
    const keyboard = enzyme.shallow(<Keyboard />);
    expect(keyboard.isEmptyRender()).toBeTruthy();
  });
  // TODO: Find a way to test keyboard event (spy + component fn?)
  /*
  it('should listen keypress', () => {
    const spy = jest.spyOn(Keyboard.prototype, 'handleKeyPress');
    const keyboard = enzyme.mount(<Keyboard />);
    keyboard.simulate('keypress', { keyCode: 32 });
    expect(spy).toBeCalled();
  });
  */
});
