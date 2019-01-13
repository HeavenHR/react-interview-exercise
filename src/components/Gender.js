import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as genders from '../constants/GenderTypes';
import styles from "./Gender.css";

class Gender extends Component {    
    render () {
        return (
        <div className={styles.addBoxMargin}>
            <select className={styles.addFriendGender} 
                onChange={this.handleChange.bind(this)}
                value={this.props.gender}>
                <option value='NONE'>Select</option>
                <option value={genders.GENDER_TYPE.MALE}>Male</option>
                <option value={genders.GENDER_TYPE.FEMALE}>Female</option>
            </select>
        </div>
        )
    }

    constructor (props, context) {
        super(props, context);
        this.state = {
          gender: this.props.gender || 'NONE',
        };
      }

    handleChange(e){
        this.props.genderChanged(e.target.value);
    }
}

Gender.propTypes = {
    gender: PropTypes.string.isRequired,
    genderChanged: PropTypes.func,
};

export default Gender