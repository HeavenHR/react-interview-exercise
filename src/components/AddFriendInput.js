import React, { Component } from "react";
import { PropTypes } from "prop-types";
import classnames from "classnames";
import styles from "./AddFriendInput.css";

class AddFriendInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || "",
      gender: ""
    };
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSelectChange(e) {
    this.setState({ gender: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = e.target[0].value.trim();
    const gender = e.target[1].value;
    this.props.addFriend(name, gender);
    this.setState({ name: "", gender: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          autoFocus="true"
          className={classnames("form-control", styles.addFriendInput)}
          placeholder="Type the name of a friend"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
        />
        <div className={styles.formContainer}>
          <select
            name="gender"
            value={this.state.gender}
            onChange={this.handleSelectChange.bind(this)}
            className={styles.genderDropdown}
          >
            <option value="">select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="submit"
            value="Add Friend"
            className={styles.btnSubmit}
          />
        </div>
      </form>
    );
  }
}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput;
