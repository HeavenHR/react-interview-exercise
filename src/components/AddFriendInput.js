import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

class AddFriendInput extends Component {

  render () {
    return (
      <div>
        <input
          type="text"
          autoFocus="true"
          className={classnames('form-control', styles.addFriendInput)}
          placeholder="Type the name of a friend"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}/>
        <select className="form-control"
                value={this.state.gender}
                onChange={this.setGender.bind(this)}
                onKeyDown={this.handleSubmitOnSelect.bind(this)}>
          <option>choose gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button className="btn btn-default form-control"
                onClick={() => this.submit(this.state.name, this.state.gender)}>Add Friend
        </button>
      </div>
    );
  }

  setGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      gender: ''
    };
  }

  handleChange (e) {
    this.setState({name: e.target.value});
  }

  handleSubmit (e) {
    const name = e.target.value.trim();
    if (e.which === 13) {
      this.submit(name, this.state.gender);
    }
  }

  handleSubmitOnSelect(e) {
    if (e.which === 13) {
      this.submit(this.state.name, this.state.gender);
    }
  }

  submit(name, gender) {
    this.props.addFriend(name, gender);
    this.setState({name: '', gender: ''});
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
