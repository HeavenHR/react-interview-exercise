import React, { Component } from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import FriendListApp from './FriendListApp';
import { default as rootReducer } from '../reducers';

const devTool = (window.window.__REDUX_DEVTOOLS_EXTENSION__ ? window.window.__REDUX_DEVTOOLS_EXTENSION__ : f => f);
const store = createStore(rootReducer, compose(devTool()));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FriendListApp />
      </Provider>
    );
  }
}
