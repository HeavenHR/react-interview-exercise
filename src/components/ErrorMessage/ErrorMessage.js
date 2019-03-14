import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const ErrorMessage = ({ message }) =>
  <span className={classnames('help-block')}>{message}</span>;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
