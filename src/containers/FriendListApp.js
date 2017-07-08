import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';
import { setPage } from '../actions/PaginationActions';
import { FriendList, AddFriendInput, Paginator } from '../components';

import {mapValues} from 'lodash';

class FriendListApp extends Component {

    render () {
        const { friendlist: { friendsById }, pagination: { currentPageNo, currentPageIds, pageSize } } = this.props;
        const actions = {
            addFriend: this.props.addFriend,
            deleteFriend: this.props.deleteFriend,
            starFriend: this.props.starFriend,
            setPage: this.props.setPage
        };
        const list = mapValues(currentPageIds, id => friendsById[id]);
        return (
            <div className={styles.friendListApp}>
              <h1>The FriendList</h1>
              <AddFriendInput addFriend={actions.addFriend} />
              <FriendList friends={list} actions={actions} />
              <Paginator setPage={actions.setPage}
                         length={friendsById.length}
                         currentPageNo={currentPageNo}
                         pageSize={pageSize}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, {
    addFriend,
    deleteFriend,
    starFriend,
    setPage
})(FriendListApp)
