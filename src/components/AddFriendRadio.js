import React, { PropTypes } from "react";
import classnames from "classnames";

import { FEMALE, MALE } from "./../constants/PageTypes";

import styles from "./AddFriendRadio.css";

const AddFriendRadio = (props) => {
  const { gender, onHandleChange } = props;
  return (
    <div className={classnames("form-control", "radio", styles.addFriendRadio)}>
      <label className={classnames(styles.addFriendRadioMale)}>
        <input
          type='radio'
          name='gender'
          value={MALE}
          checked={gender === MALE ? true : false}
          onChange={(e) => {
            onHandleChange("gender", e.target.value);
          }}
        />{" "}
        {MALE}
      </label>
      <label>
        <input
          type='radio'
          name='gender'
          value={FEMALE}
          checked={gender === FEMALE ? true : false}
          onChange={(e) => {
            onHandleChange("gender", e.target.value);
          }}
        />{" "}
        {FEMALE}{" "}
      </label>
    </div>
  );
};

AddFriendRadio.propTypes = {
  gender: PropTypes.string,
  onHandleChange: PropTypes.func.isRequired
};

export default AddFriendRadio;
