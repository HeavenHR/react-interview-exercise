import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

const AddFriendInput = (props) => {
  const { name, onHandleChange } = props;
  return (
    <input
      type="text"
      autoFocus="true"
      className={classnames('form-control', styles.addFriendInput)}
      placeholder="Type the name of a friend"
      value={name}
      onChange={(e) => {
        onHandleChange('name', e.target.value);
      }}
    />
  );
};

AddFriendInput.propTypes = {
  name: PropTypes.string,
  onHandleChange: PropTypes.func.isRequired,
};

export default AddFriendInput;
