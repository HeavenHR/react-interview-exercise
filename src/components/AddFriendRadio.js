import React, { PropTypes } from "react";
import classnames from "classnames";
import styles from "./AddFriendRadio.css";

const AddFriendRadio = (props) => {
  const { gender, onHandleChange } = props;
  return (
    <div className={classnames("form-control", "radio", styles.addFriendRadio)}>
      <label className={classnames(styles.addFriendRadioMale)}>
        <input
          type='radio'
          name='gender'
          value='Male'
          checked={gender === "Male" ? true : false}
          onChange={(e) => {
            onHandleChange("gender", e.target.value);
          }}
        />{" "}
        Male
      </label>
      <label>
        <input
          type='radio'
          name='gender'
          value='Female'
          checked={gender === "Female" ? true : false}
          onChange={(e) => {
            onHandleChange("gender", e.target.value);
          }}
        />{" "}
        Female{" "}
      </label>
    </div>
  );
};

AddFriendRadio.propTypes = {
  gender: PropTypes.string,
  onHandleChange: PropTypes.func.isRequired
};

export default AddFriendRadio;
