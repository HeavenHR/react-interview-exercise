import React, { Component, PropTypes } from "react";

import AddFriendInput from "./AddFriendInput";
import AddFriendRadio from "./AddFriendRadio";

class AddFriend extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: "",
      gender: "Male"
    };
  }

  render() {
    return (
      <div onKeyDown={this.handleSubmit}>
        <AddFriendInput name={this.state.name} onHandleChange={this.handleChange} />
        <AddFriendRadio gender={this.state.gender} onHandleChange={this.handleChange} />
      </div>
    );
  }

  resetState = () => {
    this.setState({ name: "", gender: "male" });
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSubmit = (e) => {
    const nameFromState = this.state.name.trim();
    if (e.which === 13 && nameFromState.length > 0) {
      this.props.addFriend({ name: nameFromState, gender: this.state.gender });
      this.resetState();
    }
  };
}

AddFriend.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriend;
