import React, { Component, PropTypes } from "react";
import styles from "./FriendList.css";
import classnames from "classnames";
import FriendListItem from "./FriendListItem";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      friendsPerPage: 2
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.friends.length < this.props.friends.length) {
      if (nextProps.friends.length % 2 === 0 && this.state.currentPage > 1) {
        this.setState(prevState => {
          return {
            currentPage: prevState.currentPage - 1
          };
        });
      }
    }
  }

  handlePageClick(event) {
    this.setState({
      currentPage: parseInt(event.target.id, 10)
    });
  }

  handlePrevClick() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  }

  handleNextClick(pageNumberLength) {
    if (pageNumberLength > this.state.currentPage) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  render() {
    const { currentPage, friendsPerPage } = this.state;
    const { friends } = this.props;
    const friendsWithIndex = friends.map((obj, key) => {
      obj.index = key;
      return obj;
    });
    const pageNumbers = [];
    let currentPageFriends;
    currentPageFriends = friendsWithIndex.slice(
      currentPage * friendsPerPage - friendsPerPage,
      currentPage * friendsPerPage
    );

    for (
      let i = 1;
      i <= Math.ceil(this.props.friends.length / this.state.friendsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    let displayedPageNumbers = [...pageNumbers];
    displayedPageNumbers =
      this.state.currentPage > 4 && pageNumbers.length > 4
        ? pageNumbers.slice(this.state.currentPage - 4, this.state.currentPage)
        : pageNumbers.slice(0, 4);

    return (
      <div>
        <ul className={styles.friendList}>
          {currentPageFriends.map((friend, index) => {
            return (
              <FriendListItem
                key={friend.index}
                id={friend.index}
                name={friend.name}
                gender={friend.gender}
                starred={friend.starred}
                {...this.props.actions}
              />
            );
          })}
        </ul>
        {pageNumbers.length > 1 ? (
          <div style={{ textAlign: "center" }}>
            <button
              className={`btn btn-default ${styles.btnMargin}`}
              onClick={this.handlePrevClick}
            >
              Prev
            </button>
            {displayedPageNumbers.map(number => {
              return (
                <button
                  className={classnames(`btn btn-default ${styles.btnMargin}`, {
                    activeButton: this.state.currentPage === number
                  })}
                  //className={`btn btn-default pageNumbers ${styles.btnMargin}`}
                  key={number}
                  id={number}
                  onClick={this.handlePageClick}
                >
                  {number}
                </button>
              );
            })}
            <button
              className={`btn btn-default ${styles.btnMargin}`}
              onClick={() => this.handleNextClick(pageNumbers.length)}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
