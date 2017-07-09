import React, {Component} from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import FriendListApp from './FriendListApp';
import * as reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import {updateAfterChange, showLastPage} from '../actions/PaginationActions';

const reducer = combineReducers(reducers);

const paginationUpdatingMiddleWare = store => next => action => {
  next(action);
  if (action.type === 'DELETE_FRIEND') {  //if record deleted, need to check whether to go back 1 page if current has no records
    store.dispatch(updateAfterChange());
  }
  else if (action.type === 'ADD_FRIEND') {  //if record added, we go to last page to view it
    store.dispatch(showLastPage());
  }
};

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
