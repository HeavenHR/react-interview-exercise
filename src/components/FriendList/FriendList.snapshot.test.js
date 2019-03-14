import React from 'react';

import FriendList from './FriendList';
import { createMountedComponent } from '../../utils/testutil';
import { derivePageItems } from '../../utils/pagination';
import { initialState  } from '../../reducers/friendlist';

describe('<FriendList /> should', () => {
  const pageSize = 2;
  const currentList = derivePageItems(initialState.friendsById, 1, pageSize);

  it('render correctly according to props', () => {
    const mountedFriendList = createMountedComponent({
      children: <FriendList friends={currentList} actions={localStorage.actions} />
    });

    const listItems = mountedFriendList.find('li.list-group-item');

    expect(mountedFriendList.htmlRender()).toMatchSnapshot();
    expect(listItems.length).toEqual(2);
  });
});
