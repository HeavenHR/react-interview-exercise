import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import FriendListApp from './FriendListApp';
import { default as rootReducer } from '../reducers';
import { initialState as friendlist } from '../reducers/friendlist';
import { initialState as pagination } from '../reducers/pagination';
import { createMountedComponent } from '../utils/testutil';
import { FriendList, Pagination, AddFriend } from '../components';

const store = createStore(rootReducer);

describe('<FriendListApp /> should', () => {
  it('render correctly with store', () => {
    const mountedFriendListApp = createMountedComponent({
      children: (
        <Provider store={store}>
          <FriendListApp />
        </Provider>
      )
    });

    expect(mountedFriendListApp.htmlRender()).toMatchSnapshot();
    expect(mountedFriendListApp.props().store.getState()).toEqual({ friendlist, pagination });
    expect(mountedFriendListApp.find(FriendList)).toHaveLength(1);
    expect(mountedFriendListApp.find(AddFriend)).toHaveLength(1);
    expect(mountedFriendListApp.find(Pagination)).toHaveLength(1);
    expect(mountedFriendListApp.find('h1').contains('The FriendList')).toBeTruthy();
  });
});