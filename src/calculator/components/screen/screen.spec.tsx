import * as React from 'react';
import * as enzyme from 'enzyme';
import Screen from './screen';

describe('Screen component', () => {
  it('should renders the screen without props', () => {
    const screen = enzyme.shallow(<Screen />);
    expect(screen.find('#operation').text()).toEqual('');
    expect(screen.find('#result').text()).toEqual('');
  });

  it('should renders the screen with props', () => {
    const screen = enzyme.shallow(<Screen operation={'1+1'} result={'2'} />);
    expect(screen.find('#operation').props().value).toEqual('1+1');
    expect(screen.find('#result').props().value).toEqual('2');
  });

  it('should renders error if NaN is passed as a result', () => {
    const screen = enzyme.shallow(<Screen result={'NaN'} />);
    expect(screen.find('#result').props().value).toEqual('error');
  });
});
