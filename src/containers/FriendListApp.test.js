import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import { FriendListApp } from './FriendListApp';
import { FriendList, AddFriend, FriendListPagination } from '../components';

import { MALE } from "./../constants/PageTypes";

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


});
