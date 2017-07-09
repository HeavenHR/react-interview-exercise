import React, {Component, PropTypes} from 'react';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';
import {map} from 'lodash';

class FriendList extends Component {
  render() {
    return (
      <ul className={styles.friendList}>
        {
          map(this.props.friends, (friend, index) => {
            return (
              <FriendListItem
                key={index}
                id={Number(index)}
                name={friend.name}
                gender={friend.gender}
                starred={friend.starred}
                {...this.props.actions} />
            );
          })
        }
      </ul>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
