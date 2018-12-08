import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import { FriendListApp } from './FriendListApp';
import { FriendListPagination } from '../components';

import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import { ADD_FRIEND, DELETE_FRIEND, STAR_FRIEND } from './../constants/ActionTypes';

import { MALE } from './../constants/PageTypes';

configure({ adapter: new Adapter() });

describe('Container: FriendListApp', () => {
  const props = {
    addFriend: jest.fn(),
    deleteFriend: jest.fn(),
    starFriend: jest.fn(),
    friendlist: {
      friendsById: [
        {
          id: 10000,
          name: 'Theodore Roosevelt',
          gender: MALE,
          starred: true,
        },
        {
          id: 100001,
          name: 'Abraham Lincoln',
          gender: MALE,
          starred: false,
        },
      ],
    },
  };

  const propsPagination = {
    addFriend: jest.fn(),
    deleteFriend: jest.fn(),
    starFriend: jest.fn(),
    friendlist: {
      friendsById: [
        {
          id: 10000,
          name: 'Theodore Roosevelt',
          gender: MALE,
          starred: true,
        },
        {
          id: 100001,
          name: 'Abraham Lincoln',
          gender: MALE,
          starred: false,
        },
        {
          id: 100002,
          name: 'Abraham',
          gender: MALE,
          starred: false,
        },
      ],
    },
  };

  const wrapper = shallow(<FriendListApp {...props} />);
  const wrapperPagination = shallow(<FriendListApp {...propsPagination} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('pagination should not load if less than or equal to 2', () => {
    expect(wrapper.find(FriendListPagination).length).toBe(0);
  });

  it('pagination should  load if more than  2', () => {
    expect(wrapperPagination.find(FriendListPagination).length).toBe(1);
  });

  it('pagination test func onPageChange', () => {
    wrapperPagination.instance().onPageChange('next');
    expect(wrapperPagination.instance().state.page).toBe(2);
  });

  it('test func actions', () => {
    const addObject = addFriend();
    const deleteObject = deleteFriend(1);
    const starObject = starFriend(1);
    expect(addObject.type).toBe(ADD_FRIEND);
    expect(deleteObject.type).toBe(DELETE_FRIEND);
    expect(starObject.type).toBe(STAR_FRIEND);
  });
});
