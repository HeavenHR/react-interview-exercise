import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionsObject from '../actions';
import { FriendList, Pagination, AddFriend } from '../components';
import { derivePageItems } from '../utils/pagination';

class FriendListApp extends Component {
  render() {
    const { friendlist: { friendsById }, pagination: { pageSize, currentPage, pagingRange }, actions } = this.props;
    const currentList = derivePageItems(friendsById, currentPage, pageSize) || []; // friendList should render based on currentPage
    const totalPages = Math.ceil(friendsById.length / pageSize);

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <div className={styles.wrapper}>
          <AddFriend addFriend={actions.addFriend} />
          <FriendList friends={currentList} actions={actions} />
        </div>
        {totalPages > 1 &&
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pagingRange={pagingRange}
            {...actions}
          />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionsObject, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(FriendListApp)
