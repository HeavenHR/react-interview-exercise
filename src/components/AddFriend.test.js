import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import AddFriend from './AddFriend';
import AddFriendInput from './AddFriendInput';
import AddFriendRadio from './AddFriendRadio';

configure({ adapter: new Adapter() });

describe('Component: AddFriend', () => {
  const props = {
    addFriend: jest.fn(),
  };

  const wrapper = shallow(<AddFriend {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('test AddFriendInput loaded', () => {
    expect(wrapper.find(AddFriendInput).length).toBe(1);
  });

  it('test AddFriendRadio loaded', () => {
    expect(wrapper.find(AddFriendRadio).length).toBe(1);
  });

  it('test add button disabled when no value in input box', () => {
    wrapper.setState({ name: '' });
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('test add button enabled when value in input box', () => {
    wrapper.setState({ name: 'Bbq' });
    expect(wrapper.find('button').prop('disabled')).toBe(false);
  });

  it('test add button submit', () => {
    wrapper.setState({ name: 'bbq' });
    wrapper.instance().handleSubmit();
    expect(props.addFriend.mock.calls.length).toBe(1);
  });
});
