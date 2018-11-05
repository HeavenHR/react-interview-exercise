import React, { Component, PropTypes } from 'react';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';
import PageLinks from '../containers/PageLinks';

export default class FriendList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1, //always display 1st page by default
      itemPerPage: 2, //total number of items per page
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page) {
    this.setState({
      page: page,
    });
  }

  render() {
    const { friends } = this.props;
    const { page, itemPerPage } = this.state;
    const indexOfLastTodo = page * itemPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemPerPage;
    const currentFriends = friends.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <div>
        <ul className={styles.friendList}>
          {
            currentFriends.map((friend, index) => {
              return (
                <FriendListItem
                  key={index}
                  id={friend.id}
                  name={friend.name}
                  gender={friend.gender}
                  starred={friend.starred}
                  {...this.props.actions} />
              );
            })
          }
        </ul>
        <div className={styles.textCenter}>
          {this.renderPagination()}
        </div>
      </div>
    );
  }

  renderPagination() {
    const { friends } = this.props;
    const { itemPerPage, page } = this.state;
    return (
      <PageLinks
        count={friends.length}
        itemPerPage={itemPerPage}
        handleClick={this.handleClick}
        page={page}
      />
    )
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
