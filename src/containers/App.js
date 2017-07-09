import React, {Component} from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import FriendListApp from './FriendListApp';
import * as reducers from '../reducers';
import {paginationUpdatingMiddleWare} from '../middleware/paginationUpdating';

const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunkMiddleware, paginationUpdatingMiddleWare));

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <FriendListApp />
        </Provider>
      </div>
    );
  }
}
