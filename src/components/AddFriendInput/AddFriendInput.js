import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AddFriendInput.css';
import ErrorMessage from '../ErrorMessage';

class AddFriendInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  render() {
    const { isInvalid, errorMessage } = this.props;
    return (
      <div className={classnames('form-group', { 'has-error': isInvalid })}>
        <input
          type="text"
          autoFocus="true"
          className={classnames('form-control', styles.addFriendInput)}
          placeholder="Type the name of a friend"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}
        />
        {isInvalid && errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (value !== this.props.value) {
      this.setState({ value });
    }
  }

  handleChange(e) {
    const value = e.target.value;
    const { onChange } = this.props;

    this.setState({ value });
    onChange && onChange(value);
  }

  handleSubmit(e) {
    const { onSubmit } = this.props;
    if (e.which === 13) {
      onSubmit && onSubmit();
    }
  }
}

export default AddFriendInput
