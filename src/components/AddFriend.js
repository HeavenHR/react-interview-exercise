import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import AddFriendInput from "./AddFriendInput";
import AddFriendRadio from "./AddFriendRadio";

import { MALE } from "./../constants/PageTypes";

import styles from "./AddFriend.css";

class AddFriend extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      gender: MALE
    };
  }

  render() {
    return (
      <div onKeyDown={this.handleKeyDown} className={styles.addFriendContainer}>
        <AddFriendInput name={this.state.name} onHandleChange={this.handleChange} />
        <AddFriendRadio gender={this.state.gender} onHandleChange={this.handleChange} />
        <div className={classnames("text-center", styles.addFriendButtonHolder)}>
          <button
            type='button'
            className='btn'
            onClick={this.handleSubmit}
            disabled={this.state.name.length > 0 ? false : true}>
            Add Friend
          </button>
        </div>
      </div>
    );
  }

  resetState = () => {
    this.setState({ name: "", gender: MALE });
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSubmit = () => {
    const nameFromState = this.state.name.trim();
    this.props.addFriend({ name: nameFromState, gender: this.state.gender });
    this.resetState();
  };

  handleKeyDown = (e) => {
    const nameFromState = this.state.name.trim();
    if (e.which === 13 && nameFromState.length > 0) {
      this.handleSubmit();
    }
  };
}

AddFriend.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriend;
