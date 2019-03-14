import React from 'react';

import FriendListItem from './FriendListItem';
import { createMountedComponent } from '../../utils/testutil';
import { initialState } from '../../reducers/friendlist';

describe('<FriendListItem /> should', () => {
  const mountedFriendListItem = createMountedComponent({
    children: (
      <FriendListItem
        id={0}
        {...initialState.friendsById[0]}
        {...localStorage.actions}
      />)
  });

  const buttons = mountedFriendListItem.find('button').map(item => item);

  it('render correctly according to props', () => {
    expect(mountedFriendListItem.htmlRender()).toMatchSnapshot();
  });

  it('simulate starFriend action when click star button', () => {
    buttons[0].simulate('click');

    expect(mountedFriendListItem.props().starFriend).toBeCalledWith(0);
  });

  it('simulate delete action when click delete button', () => {
    buttons[1].simulate('click');

    expect(mountedFriendListItem.props().deleteFriend).toBeCalledWith(0);
  });
});
