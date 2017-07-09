import React, { Component } from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import FriendListApp from './FriendListApp';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
import thunkMiddleware from 'redux-thunk';
import { updateAfterChange, showLastPage } from '../actions/PaginationActions';

const customMiddleWare = store => next => action => {
    next(action);
    if(action.type === 'DELETE_FRIEND' || action.type === 'ADD_FRIEND'){
        store.dispatch(updateAfterChange())
        if(action.type === 'ADD_FRIEND'){
            store.dispatch(showLastPage());
        }
    }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, customMiddleWare));

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
