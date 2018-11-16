import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme';
import sinon from 'sinon';

/**
 * 'enzyme-adapter-react-15' is to run with 'react: ^15.5.4',
 *  for reference https://github.com/airbnb/enzyme.
 */
import Adapter from 'enzyme-adapter-react-15';

import FriendListContainer from './index';
import Pagination from '../../components/Pagination';
import FriendList from '../../components/FriendList';
import FriendListItem from '../../components/FriendListItem';

// Should configure enzyme to use the adapter you want it to use.
Enzyme.configure({ adapter: new Adapter() });

const friendsById = [
  {
    "name": "Theodore Roosevelt",
    "starred": true
  },
  {
    "name": "Abraham Lincoln",
    "starred": false
  },
  {
    "name": "George Washington",
    "starred": false
  }
];

describe('FriendListContainer-Component Test Cases', () => {
  // Nested-Children-Components can't be verified with "shallow".
  it('should render FriendListContainer-Component with FriendList & Pagination Components', () => {
    const starFriend = sinon.spy();
    const genderFriend = sinon.spy();
    const wrapper = shallow(<FriendListContainer friends={friendsById} actions={{starFriend, genderFriend}} />);
    expect(wrapper.find(FriendList)).to.have.lengthOf(1);
    expect(wrapper.find(Pagination)).to.have.lengthOf(1);
  });
  
  // Nested-Children-Components can be verified with "mount".
  it('should mount FriendListContainer-Component along with all it\'s Children-Components without any prop-errors', () => {
    const starFriend = sinon.spy();
    const genderFriend = sinon.spy();
    const wrapper = mount(<FriendListContainer friends={friendsById} actions={{starFriend, genderFriend}} />);
    expect(wrapper.find(FriendList)).to.have.lengthOf(1);
    // Nested-Children-Component (FriendListItem), can't be verified with "shallow", it can be verified with "mount".
    expect(wrapper.find(FriendListItem)).to.have.lengthOf(2);
    expect(wrapper.find(Pagination)).to.have.lengthOf(1);
  });

  it('should render only 1-FriendListItem-Component onClick of next-button, i.e when on 2nd-page', () => {
    const starFriend = sinon.spy();
    const genderFriend = sinon.spy();
    const wrapper = mount(<FriendListContainer friends={friendsById} actions={{starFriend, genderFriend}} />);
    wrapper.find('.next').simulate('click');
    // Nested-Children-Component (FriendListItem), can't be verified with "shallow", it can be verified with "mount".
    expect(wrapper.find(FriendListItem)).to.have.lengthOf(1);
  });

  it('should render 2-FriendListItem-Components on 1st-page, i.e. on initial render', () => {
    const starFriend = sinon.spy();
    const genderFriend = sinon.spy();
    const wrapper = mount(<FriendListContainer friends={friendsById} actions={{starFriend, genderFriend}} />);
    // Nested-Children-Component (FriendListItem), can't be verified with "shallow", it can be verified with "mount".
    expect(wrapper.find(FriendListItem)).to.have.lengthOf(2);
  });
});
