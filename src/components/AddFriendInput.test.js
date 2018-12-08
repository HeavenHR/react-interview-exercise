import React from 'react';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import AddFriendInput from './AddFriendInput';

configure({ adapter: new Adapter() });

describe('Component: AddFriendInput', () => {
  const props = {
    name: 'Adam',
    onHandleChange: jest.fn(),
  };

  const wrapper = shallow(<AddFriendInput {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('test onchange of input', () => {
    wrapper.find('input').simulate('change', {target: {value: 'Bbq'}});
    expect(props.onHandleChange.mock.calls.length).toBe(1);
  });
});
