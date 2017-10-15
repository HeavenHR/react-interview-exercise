import React, { Component } from 'react';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';

import {addFriend, deleteFriend, starFriend} from '../actions/FriendsActions';
import { updatePage } from '../actions/PaginationActions';
import { selectors as paginationSelectors } from '../reducers/pagination';
import { FriendList, AddFriendInput, Pagination } from '../components';

class FriendListApp extends Component {

  render () {
    const { pagination, friendsById, friendsTotal } = this.props;

    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={friendsById} actions={actions} />
        <Pagination pagination={pagination} 
                    size={friendsTotal} 
                    onUpdatePage={this.props.updatePage} />
      </div>
    );
  }
}

function mapStateToProps({pagination, friendlist: { friendsById }}) {
  return {
    pagination: pagination,
    friendsTotal: friendsById.length,
    friendsById: paginationSelectors.getItemsForPage(pagination, friendsById)
  };
}

export default connect(mapStateToProps, {
  addFriend,
  deleteFriend,
  starFriend,
  updatePage
})(FriendListApp)
