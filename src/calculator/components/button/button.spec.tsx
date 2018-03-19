import * as React from 'react';
import * as enzyme from 'enzyme';
import Button from './button';

describe('Button component', () => {
  const mockCallBack = jest.fn();
  const button = enzyme.shallow(
    <Button value="C" className={'btn-primary'} onClick={mockCallBack} />
  );

  it('should renders the button with the correct text value', () => {
    expect(button.text()).toEqual('C');
  });

  it('should renders the button with an attribute', () => {
    expect(button.find('[data-btn="C"]').exists()).toBeTruthy();
  });

  it('should renders the button with the correct custom class', () => {
    expect(button.hasClass('btn btn-primary')).toBeTruthy();
  });

  it('should simulates click events', () => {
    button.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
