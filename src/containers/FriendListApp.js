import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FriendListApp.css';
import { connect } from 'react-redux';
import { slice, isEqual } from 'lodash';

import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import { FriendList, AddFriend, FriendListPagination } from '../components';

export class FriendListApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: 1,
      totalPages: 1,
      friendListItems: [],
      isNextPagePresent: false,
      ispreviousPagePresent: false,
    };
    this.pageLimit = 2;
  }

  componentWillMount() {
    this.getFriendsList(this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.friendlist.friendsById.length !== this.props.friendlist.friendsById.length) {
      const totalPages = Math.ceil(this.props.friendlist.friendsById.length / this.pageLimit);
      if (this.state.page > totalPages || this.state.page === 0) {
        this.setState({ page: totalPages }, () => {
          this.getFriendsList(this.state.page);
        });
      } else {
        this.getFriendsList(this.state.page);
      }
    }
  }

  render() {
    const {
      friendlist: { friendsById },
    } = this.props;
    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend,
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriend addFriend={actions.addFriend} />
        <FriendList friends={this.state.friendListItems} actions={actions} />
        {friendsById.length > 2 ? (
          <FriendListPagination
            page={this.state.page}
            totalPages={this.state.totalPages}
            onPageChange={this.onPageChange}
            isNextPagePresent={this.state.isNextPagePresent}
            ispreviousPagePresent={this.state.ispreviousPagePresent}
          />
        ) : (
          ''
        )}
      </div>
    );
  }

  getFriendsList = (page) => {
    const {
      friendlist: { friendsById },
    } = this.props;
    const totalPages = Math.ceil(friendsById.length / this.pageLimit);
    const offset = (page - 1) * this.pageLimit;
    const friendListItems = slice(friendsById, offset, offset + this.pageLimit);
    const isNextPagePresent =
      friendListItems.length > 0 &&
      friendsById.length > 0 &&
      !isEqual(friendListItems[friendListItems.length - 1], friendsById[friendsById.length - 1])
        ? true
        : false;
    const ispreviousPagePresent =
      friendListItems.length > 0 && friendsById.length > 0 && !isEqual(friendListItems[0], friendsById[0])
        ? true
        : false;
    this.setState({
      page: page,
      totalPages: totalPages,
      friendListItems: friendListItems,
      isNextPagePresent: isNextPagePresent,
      ispreviousPagePresent: ispreviousPagePresent,
    });
  };

  onPageChange = (action) => {
    const pageNumbertoExecute = action === 'next' ? this.state.page + 1 : this.state.page - 1;
    this.getFriendsList(pageNumbertoExecute);
  };
}

FriendListApp.propTypes = {
  friendlist: PropTypes.shape({
    friendsById: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        gender: PropTypes.string,
        starred: PropTypes.bool,
      })
    ),
  }),
  addFriend: PropTypes.func,
  deleteFriend: PropTypes.func,
  starFriend: PropTypes.func,
};

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  {
    addFriend,
    deleteFriend,
    starFriend,
  }
)(FriendListApp);
