import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AddFriendInput.css';
import { GENDERS } from '../constants/Gender';

class AddFriendInput extends Component {

  render () {
    const { name, gender, validation } = this.state;
    return (
      <div className={styles.addFriendForm}>
        <input
          type="text"
          name="name"
          autoFocus="true"
          className={classnames('form-control', styles.addFriendInput, { [styles.hasError]: !validation.name })}
          placeholder="Type the name of a friend"
          value={name}
          onChange={this.handleChange.bind(this)} />
        <select
          name="gender"
          className={classnames('form-control', styles.addFriendSelect, { [styles.hasError]: !validation.gender})}
          value={gender}
          onChange={this.handleChange.bind(this)}>
            <option key={0} hidden>Gender...</option>
          {
            GENDERS.map(gender => <option key={gender} value={gender}>{gender}</option>)
          }
        </select>
        <input
          className={classnames('btn btn-default', styles.addFriendSubmit)}
          type="submit"
          value="Submit"
          onClick={this.handleSubmit.bind(this)}/>
      </div>
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      gender: this.props.gender || 'placeholder',
      validation: {
        name: true,
        gender: true,
      }
    };
  }

  handleChange (e) {
    const { name, value, validation } = e.target;
    this.setState({ [name]: value });
    if(!value) {
      this.setState({
        validation: {
          ...validation,
          [name]: false
        }
      })
    }
  }

  isFormValid () {
    const { name, gender } = this.state;
    let validation = {
      name: !!name,
      gender: gender !== 'placeholder',
    }

    this.setState({ validation })

    if( !name || gender === 'placeholder' ) {
      return false;
    }

    return true;
  }

  handleSubmit (e) {
    const { name, gender } = this.state;
    if (this.isFormValid()) {
      this.props.addFriend({ name, gender });
      this.setState({ name: '', gender: 'placeholder' });
    }
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
