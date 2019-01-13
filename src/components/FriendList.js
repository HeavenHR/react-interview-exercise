import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./FriendList.css";
import FriendListItem from "./FriendListItem";
import Pagination from "./Pagination";

const settings = {
  pageSize: 2,
  displayItem: 3
};

const ACTION = {
  ADDED: "ADDED",
  DELETED: "DELETED"
};

class FriendList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentPage: this.props.currentPage || 1,
      friends: this.props.friends
    };
    this.action = "";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friends.length > this.state.friends.length) {
      // adding new item
      this.action = ACTION.ADDED;
    } else if (nextProps.friends.length < this.state.friends.length) {
      // deleting item
      this.action = ACTION.DELETED;
      // find deleting item
      let deletingIndex = 1;
      this.state.friends.filter((friend, index) => {
        const matchItem = nextProps.friends.filter(f => {
          return f.name === friend.name;
        });
        if (matchItem.length === 0) {
          deletingIndex = index + 1;
          return true;
        }
        return false;
      });
      this.deletingIndex = deletingIndex;
    } else {
      // changing page
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // clear action
    this.action = "";
    this.deletingIndex = 0;
  }

  getPageIndex(recentAction, currentPage, total) {
    let pageIndex = Number(currentPage);
    if (recentAction === ACTION.ADDED) {
      // move index to last page
      pageIndex = this.getLastPageIndex(total);
    } else if (recentAction === ACTION.DELETED) {
      const lastPageIndex = this.getLastPageIndex(total);
      const deletingPageIndex = Math.ceil(
        this.deletingIndex / settings.pageSize
      );
      if (deletingPageIndex > lastPageIndex) {
        pageIndex = lastPageIndex;
      } else {
        pageIndex = deletingPageIndex;
      }
    }
    return pageIndex;
  }

  getLastPageIndex(total) {
    return Math.ceil(total / settings.pageSize);
  }

  getOnPageFriendList(pageIndex, friendList) {
    const shownIndex = [];

    let start = (pageIndex - 1) * settings.pageSize;
    for (let i = 0; i < settings.pageSize; i++) {
      shownIndex.push(start);
      start++;
    }

    return friendList.filter((friend, index) => shownIndex.includes(index));
  }

  getActualIndex(index, pageIndex) {
    return settings.pageSize * (pageIndex - 1) + index;
  }

  handlePageChanged(index) {
    this.setState({ currentPage: index });
  }

  render() {
    const total = this.props.friends.length;
    // get the page index from recent action
    let pageIndex = this.getPageIndex(
      this.action,
      this.state.currentPage,
      total
    );

    const onPageFriends = this.getOnPageFriendList(
      pageIndex,
      this.props.friends
    );
    const pagination =
      total > settings.pageSize ? (
        <Pagination
          currentIndex={pageIndex}
          total={total}
          pageSize={settings.pageSize}
          displayItem={settings.displayItem}
          pageChanged={this.handlePageChanged.bind(this)}
        />
      ) : null;

    return (
      <div>
        <ul className={styles.friendList}>
          {onPageFriends.map((friend, index) => {
            return (
              <FriendListItem
                key={this.getActualIndex(index, pageIndex)}
                id={this.getActualIndex(index, pageIndex)}
                name={friend.name}
                gender={friend.gender}
                starred={friend.starred}
                {...this.props.actions}
              />
            );
          })}
        </ul>
        {pagination}
      </div>
    );
  }
}

FriendList.propTypes = {
  currentPage: PropTypes.number,
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  recentAction: PropTypes.string
};

export default FriendList;
