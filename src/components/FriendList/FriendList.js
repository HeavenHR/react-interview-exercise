import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FriendList.css';
import FriendListItem from '../FriendListItem';

class FriendList extends Component {
  render () {
    return (
      <ul className={`list-group ${styles.friendList}`}>
        {
          this.props.friends.map((friend, index) => {
            return (
              <FriendListItem
                key={index}
                id={index}
                {...friend}
                {...this.props.actions} />
            );
          })
        }
      </ul>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
