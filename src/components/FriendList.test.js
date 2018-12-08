import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import FriendList from './FriendList';
import FriendListItem from './FriendListItem';

import { MALE } from './../constants/PageTypes';

configure({ adapter: new Adapter() });

describe('Component: FriendList', () => {
  const props = {
    friends: [
      {
        id: 123,
        name: 'Theodore Roosevelt',
        gender: MALE,
        starred: true,
      },
    ],
    actions: {
      addFriend: jest.fn(),
      deleteFriend: jest.fn(),
      starFriend: jest.fn(),
    },
  };

  const wrapper = shallow(<FriendList {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('test FriendListItem loaded', () => {
    expect(wrapper.find(FriendListItem).length).toBe(1);
  });
});
