import React from 'react';
import App from './App';
import { createMountedComponent, expectedAddFriendState } from '../utils/testutil';


describe('<App /> should', () => {
  it('renders without crashing', () => {
    const mountedApp = createMountedComponent({
      children: <App />
    });

    expect(mountedApp.htmlRender()).toMatchSnapshot();
  });
});
