import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import omit from 'lodash/omit';

import AddFriendInput from '../AddFriendInput';
import ButtonsGroup from '../ButtonGroup';

import styles from './AddFriend.css';

const cn = className.bind(styles);

class AddFriend extends Component {
  static propTypes = {
    addFriend: PropTypes.func.isRequired
  }

  state = {
    name: '',
    gender: '',
    validation: {}
  }

  validation = (newGender) => {
    const { name, gender } = this.state;
    const updatedGender = newGender || gender;

    const validation = {
      nameInvalid: !name,
      genderInvalid: !updatedGender
    };

    this.setState({ validation });

    return !Object.values(validation).includes(true);
  }

  resetState = () => this.setState({ name: '', gender: '', validation: {} });

  handleGenderSelect = gender => {
    const { addFriend } = this.props;

    if (this.validation(gender)) {
      addFriend && addFriend({ ...omit(this.state, 'validation'), gender });
      this.resetState();
    } else {
      this.setState({ gender });
    }
  }

  handleNameChange = name => {
    this.setState({ name, validation: {} });
  }

  handleSubmit = () => {
    const { addFriend } = this.props;

    if (this.validation()) {
      addFriend && addFriend(omit(this.state, 'validation'));
      this.resetState();
    }
  }

  options = [
    {value: 'male', showIcon: true},
    {value: 'female', showIcon: true}
  ]

  render() {
    const { name, gender, validation: { nameInvalid, genderInvalid } } = this.state;

    return (
      <div className={cn('addFriend')}>
        <AddFriendInput
          value={name}
          onSubmit={this.handleSubmit}
          onChange={this.handleNameChange}
          isInvalid={nameInvalid}
          errorMessage="Please fill friend name"
        />
        <ButtonsGroup
          selected={gender}
          options={this.options}
          onClick={this.handleGenderSelect}
          isInvalid={genderInvalid}
          errorMessage="Please select gender"
        />
      </div>
    );
  }
}

export default AddFriend;
