import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';
import { ITEMS_PER_PAGE } from '../constants/PagingSettings';

class FriendList extends Component {
  render () {
    const { itemsPerPage } = this.state;
    return (
      <div className={styles.friendListWrapper}>
        <div className={styles.friendListOptions}>
          Friends per page:
          <select
            value={itemsPerPage}
            onChange={e => this.setState({ itemsPerPage: e.target.value, page: 1 })}
            className={styles.friendListOptions__select}>
            {
              ITEMS_PER_PAGE.map(option => {
                return <option
                          key={option}
                          value={option}
                          className={styles.friendListOptions__option}>
                          {option}
                        </option>
              })
            }
          </select>
        </div>
        <ul className={styles.friendList}>
          {
            this.getPageItems().map((friend, index) => {
              return (
                <FriendListItem
                  key={index}
                  id={index}
                  {...friend} // { name, gender, starred }
                  {...this.props.actions} // { addFriend, deleteFriend, starFriend }
                />
              );
            })
          }
        </ul>
        <div className={styles.friendListPaging}>
          <button
            onClick={() => this.goPrevPage()}
            disabled={this.isFirstPage()}
            className='btn btn-default btn-xs'>
            <i className="fa fa-caret-left"></i>
          </button>
          <button
            onClick={() => this.goNextPage()}
            disabled={this.isLastPage()}
            className='btn btn-default btn-xs'>
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
      </div>
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      page: 1,
      itemsPerPage: 2
    };
  }

  getPageItems () {
    const { page, itemsPerPage } = this.state;
    const { friends } = this.props;

    if(friends.length <= itemsPerPage) {
      return friends
    }

    const firstPageItem = (page * itemsPerPage) - itemsPerPage;
    return [...friends].splice(firstPageItem, itemsPerPage)
  }

  goPrevPage () {
    this.setState({ page: this.state.page - 1 })
  }

  goNextPage () {
    this.setState({ page: this.state.page + 1 })
  }

  isFirstPage () {
    return this.state.page === 1
  }

  isLastPage () {
    const { page, itemsPerPage } = this.state;
    const { friends } = this.props;
    return friends.length <= page * itemsPerPage
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
