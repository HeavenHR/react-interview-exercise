import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './FriendListItem.css';

class FriendListItem extends Component {
  constructor(props) {
    super(props);

    this.handleGenderSelect = this.handleGenderSelect.bind(this);
  }

  handleGenderSelect(e) {
    this.props.genderFriend(this.props.id, e.target.name);
  }

  render() {
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendsContainer}>
          <div className={styles.friendInfos}>
            <div><span>{this.props.name}</span></div>
            <div>
              <small>xx friends in common</small>
            </div>
          </div>
          <div className={styles.friendActions}>
            <button className={`starred btn btn-default ${styles.btnAction}`}
                    onClick={() => this.props.starFriend(this.props.id)}>
              <i className={classnames('fa', {
                'fa-star': this.props.starred,
                'fa-star-o': !this.props.starred
              })} />
            </button>
            <button className={`delete btn btn-default ${styles.btnAction}`}
                    onClick={() => this.props.deleteFriend(this.props.id)}>
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
        <div className={styles.gender}>
          <span className={styles.label}>Sex:</span>
          <div className={`gender ${styles.inputGroup}`}>
            {/* Declaring Anonymous function in onClick/onChange/mouse-event-handlers is a performance issue, so used this.handleGenderSelect  */}
            <input className={`male ${styles.input}`} type="checkbox" name="male" checked={this.props.gender === 'male'} onChange={this.handleGenderSelect} />Male<br />
            <input className={`female ${styles.input}`} type="checkbox" name="female" checked={this.props.gender === 'female'} onChange={this.handleGenderSelect} />Female
          </div>
        </div>
      </li>
    );
  }
}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  starred: PropTypes.bool,
  gender: PropTypes.string,
  starFriend: PropTypes.func.isRequired,
  genderFriend: PropTypes.func.isRequired
};

export default FriendListItem
