import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import styles from "./AddFriendInput.css";
import Gender from "./Gender";

class AddFriendInput extends Component {
  render() {
    return (
      <div className={styles.addMargin}>
        <input
          type="text"
          autoFocus="true"
          className={classnames("form-control", styles.addFriendInput)}
          placeholder="Type the name of a friend"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}
        />
        <Gender
          gender={this.state.gender}
          genderChanged={this.handleGenderChange.bind(this)}
        />
      </div>
    );
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || "",
      gender: this.props.gender || "NONE"
    };
  }

  handleGenderChange(value) {
    this.setState({ gender: value });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    const name = e.target.value.trim();
    const gender = this.state.gender;
    if (e.which === 13) {
      if (gender === "NONE") {
        alert("Please select gender");
        return;
      }
      console.log("enter name : " + name + ", gender : " + gender);
      this.props.addFriend(name, gender);
      this.setState({ name: "", gender: "NONE" });
    }
  }
}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput;
