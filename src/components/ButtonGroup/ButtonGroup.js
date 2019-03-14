import React, { Component } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';

import styles from './ButtonGroup.css';
import ErrorMessage from '../ErrorMessage';

const cn = className.bind(styles);

class ButtonGroup extends Component {
  static propTypes = {
    selected: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  state = {
    selected: this.props.selected
  }

  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps;

    if (this.props !== nextProps) {
      this.setState({ selected });
    }
  }

  handleClick = (selected) => () => {
    const { onClick } = this.props;

    this.setState({ selected })
    onClick && onClick(selected);
  }

  isActive = value => {
    return this.state.selected === value;
  }

  renderOptions = () => {
    const { options = [] } = this.props;
    
    // Note: Button should be a separate component, due to time constrain I used it directly here
    return options.map(({value, showIcon}) => (
      <button
        key={value}
        type="button"
        value={value}
        onClick={this.handleClick(value)}
        className={cn('btn btn-primary col-sm-6', { active: this.isActive(value) })}
      >
        {showIcon && <i className={cn(`fa fa-${value}`)} />}
        {value}
      </button>
    ));
  }

  render() {
    const { isInvalid, errorMessage } = this.props;
    return (
      <div className={cn('form-group', { 'has-error': isInvalid })}>
        <div className={cn('btn-group btn-block')} >
          {this.renderOptions()}
        </div>
        {isInvalid && errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default ButtonGroup;
