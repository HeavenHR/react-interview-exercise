import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import styles from './FriendListItem.css';

class FriendListItem extends Component {
  constructor(props) {
    super(props);

    this.handleGenderSelect = this.handleGenderSelect.bind(this);
  }

  handleGenderSelect(e) {
    this.props.genderFriend(this.props.id, e.currentTarget.name);
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
            <button className={`btn btn-default ${styles.btnAction}`}
                    onClick={() => this.props.starFriend(this.props.id)}>
              <i className={classnames('fa', {
                'fa-star': this.props.starred,
                'fa-star-o': !this.props.starred
              })} />
            </button>
            <button className={`btn btn-default ${styles.btnAction}`}
                    onClick={() => this.props.deleteFriend(this.props.id)}>
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
        <div className={styles.gender}>
          <span className={styles.label}>Sex:</span>
          <div className={styles.inputGroup}>
            <input className={styles.input} type="checkbox" name="male" checked={this.props.gender === 'male'} onChange={this.handleGenderSelect} />Male<br />
            <input className={styles.input} type="checkbox" name="female" checked={this.props.gender === 'female'} onChange={this.handleGenderSelect} />Female
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
  starFriend: PropTypes.func.isRequired
};

export default FriendListItem
