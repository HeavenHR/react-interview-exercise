import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import styles from "./FriendListItem.css";
import * as genders from "../constants/GenderTypes";

class FriendListItem extends Component {
  render() {
    return (
      <li className={styles.friendListItem} name='friend-item'>
        <div className={styles.friendInfos}>
          <div>
            <span>{this.props.name} </span>
          </div>
          <div>
            <small>
              {this.printGender(this.props.name, this.props.gender)}{" "}
            </small>
          </div>
          <div>
            <small>xx friends in common</small>
          </div>
        </div>
        <div className={styles.friendActions}>
          <button
            className={`btn btn-default ${styles.btnAction}`}
            onClick={() => this.props.starFriend(this.props.id)}
          >
            <i
              className={classnames("fa", {
                "fa-star": this.props.starred,
                "fa-star-o": !this.props.starred
              })}
            />
          </button>
          <button
            className={`btn btn-default ${styles.btnAction}`}
            onClick={() => this.props.deleteFriend(this.props.id)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }

  printGender(name, gender) {
    if (gender === genders.GENDER_TYPE.MALE) {
      return <span>[MALE]</span>;
    } else if (gender === genders.GENDER_TYPE.FEMALE) {
      return <span>[FEMALE]</span>;
    } else {
      return <span>GENDER WAS NOT SELECTED</span>;
    }
  }
}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired
};

export default FriendListItem;
