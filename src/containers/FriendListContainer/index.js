import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { FriendList, Pagination } from '../../components';

class FriendListContainer extends Component {
  constructor(props) {
    super(props);

    const friendsListByChunks = this.paginateFriendsList(props);

    this.state = {
      friendsListByChunks,
      selectedPageIndex: 0
    };

    this.onPageSelect = this.onPageSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friends !== this.props.friends) {
      const friendsListByChunks = this.paginateFriendsList(nextProps);
      const { selectedPageIndex } = this.state;
      
      this.setState({
        friendsListByChunks,
        /**
         * Let say we have 3-pages in total,
         *  and let say you are on 3rd-page/last-page, & deleted all items by clicking on delete-button,
         *  then last-page-index will change from 3 to 2, then updating selectedPageIndex to the new-last-page-index 2.
         * Note: Corner-Cases.
         */
        selectedPageIndex: selectedPageIndex >= friendsListByChunks.length ? friendsListByChunks.length - 1 : selectedPageIndex
      });
    }
  }

  onPageSelect(selectedPageIndex) {
    this.setState({
      selectedPageIndex
    });
  }

  // Creating chunks, when there are more than 2 entries, for the pagination.
  paginateFriendsList({ friends = [] }) {
    return _.chunk(friends, 2);
  }

  render() {
    const { actions } = this.props;
    const { friendsListByChunks = [], selectedPageIndex = 0 } = this.state;

    return(
      <div>
        <div>
          {/* Renders only selected-page-items to save the cost of rendering time */}
          <FriendList friends={friendsListByChunks[selectedPageIndex]} actions={actions} selectedPageIndex={selectedPageIndex} />
        </div>
        <Pagination friendsListByChunks={friendsListByChunks} onPageSelect={this.onPageSelect} selectedPageIndex={selectedPageIndex} />
      </div>
    );
  }
};

FriendListContainer.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendListContainer;
