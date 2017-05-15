import React, { Component, PropTypes } from 'react';
import mapValues from 'lodash/mapValues';

import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

class FriendList extends Component {

  render () {
    return (
      <ul className={styles.friendList}>
        {
          this.props.friends.map(friend => {
            return (<FriendListItem
              key={friend.id}
              id={friend.id}
              name={friend.name}
              starred={friend.starred}
              {...this.props.actions} />);
          })
        }
      </ul>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default FriendList
