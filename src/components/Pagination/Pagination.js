import React, { Component } from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import classNames from 'classnames/bind';
import styles from './Pagination.css';
import { derivePageItems, deriveNextPage } from '../../utils/pagination';

const cn = classNames.bind(styles);

class Pagination extends Component {
  static propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pagingRange: PropTypes.number.isRequired,
    updatePagination: PropTypes.func
  }

  static defaultProps = {
    totalPages: 6,
    currentPage: 1,
    pagingRange: 3
  }

  state = {
    totalPages: this.props.totalPages,
    currentPage: this.props.currentPage,
    pagingRange: this.props.pagingRange
  }

  componentWillReceiveProps(nextProps) {
    const { totalPages, pagingRange } = nextProps;

    if (this.props !== nextProps) {
      this.setState({ totalPages, pagingRange });
    }
  }

  handlePageSelection = newPage => () => {
    const { totalPages, currentPage } = this.state;
    const { updatePagination } = this.props;
    const nextPage = deriveNextPage(newPage, currentPage, totalPages);

    if (nextPage !== currentPage) {
      this.setState({ currentPage: nextPage });
      updatePagination && updatePagination(nextPage);
    }
  }

  renderPagination = () => {
    const { totalPages, currentPage, pagingRange } = this.state;
    const pageNumbers = range(1, totalPages + 1);
    const pageList = derivePageItems(pageNumbers, Math.ceil(currentPage / pagingRange), pagingRange);

    const listItem = ['< prev', ...pageList, 'next >'];
    const isDisabled = page => (currentPage === 1 && page === '< prev') ||
      (currentPage === totalPages && page === 'next >');

    return listItem.map((page, index) =>
      <li
        onClick={this.handlePageSelection(page)}
        key={index}
        className={cn('page-item', { current: page === currentPage, disabled: isDisabled(page) })}
      >
        <a className={cn('page-link')} href="#">{page}</a>
      </li>
    );
  }

  render() {
    return (
      <div className={cn(styles.paginationWrapper)}>
        <ul className={cn('pagination')}>
          {this.renderPagination()}
        </ul>
      </div>
    );
  }
}

export default Pagination;
