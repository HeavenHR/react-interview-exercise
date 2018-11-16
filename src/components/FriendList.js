import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

const time = new Date().getTime();

class FriendList extends Component {
  render () {
    const { selectedPageIndex } = this.props;

    return (
      <ul className={styles.friendList}>
        {
          this.props.friends.map((friend, index) => {
            return (
              <FriendListItem
                /**
                 * Using "time = new Date().getTime()" to create unique-keys, usually any item from the API-response will be having unique_id,
                 *  then there is no need to construct unique-keys like this.
                 */
                key={`${time}_${index}`}
                /**
                 * Constructing sequence_ids, usually any item from the API-response will be having unique_id,
                 *  then there is no need to construct sequence-ids like this, when we create chunks out of original data.
                 */
                id={2 * selectedPageIndex + index}
                name={friend.name}
                starred={friend.starred}
                gender={friend.gender}
                {...this.props.actions}
              />
            );
          })
        }
      </ul>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  selectedPageIndex: PropTypes.number.isRequired
};

export default FriendList;
