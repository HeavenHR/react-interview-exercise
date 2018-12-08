import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import FriendListItem from './FriendListItem';

import { MALE } from './../constants/PageTypes';

configure({ adapter: new Adapter() });

describe('Component: FriendListItem', () => {
  const props = {
    id: 1111,
    name: 'Bbq',
    gender: MALE,
    starred: false,
    starFriend: jest.fn(),
    deleteFriend: jest.fn(),
  };

  const wrapper = shallow(<FriendListItem {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('test name loaded on card', () => {
    expect(
      wrapper
        .find('span')
        .first()
        .text()
    ).toBe(props.name);
  });

  it('test gender loaded on card', () => {
    expect(
      wrapper
        .find('span')
        .last()
        .text()
    ).toBe(props.gender);
  });

  it('test star button click on card', () => {
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(props.starFriend.mock.calls.length).toBe(1);
  });

  it('test delete button click on card', () => {
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(props.deleteFriend.mock.calls.length).toBe(1);
  });
});
