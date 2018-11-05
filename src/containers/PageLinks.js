/**
 * but i tried to make the pagination component reusable
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './pageLinks.css';

export default class PageLinks extends Component {

  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.goPreviousPage = this.goPreviousPage.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
    this.state = {
      pageNumbers: [],
    };
  }

  componentWillMount() {
    const { count } = this.props;
    this.caculateTotalPages(count);
  }

  componentWillReceiveProps(nextProps) {
    const { count } = nextProps;
    const { pageNumbers } = this.state;
    this.caculateTotalPages(count);
    this.setState({
      firstPage: pageNumbers[0],
      lastPage: pageNumbers[pageNumbers.length - 1],
    });
  }

  caculateTotalPages(count) {
    const { itemPerPage } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / itemPerPage); i++) {
      pageNumbers.push(i);
    }
    this.setState({
      pageNumbers: pageNumbers,
    })
  }

  goPreviousPage() {
    const { firstPage } = this.state;
    const { page } = this.props;
    if (page !== firstPage)
      this.props.handleClick(this.props.page - 1);
  }

  goNextPage() {
    const { lastPage } = this.state;
    const { page } = this.props;
    if (page !== lastPage)
      this.props.handleClick(this.props.page + 1);
  }

  onPageChange(event) {
    this.props.handleClick(Number(event.target.id));
  }

  renderPageNumbers() {
    const { page } = this.props;
    const { pageNumbers } = this.state;
    return (pageNumbers || []).map(number =>
      <a
        key={number}
        id={number}
        onClick={this.onPageChange}
        className={classnames('pageLinks', number === page ? styles.active : '')}
      >
        {number}
      </a>
    );
  }

  renderNext() {
    return (
      <a
        key={'next'}
        id={'next'}
        onClick={this.goNextPage}
      >
        &gt;
      </a>
    )
  }

  renderPrevious() {
    return (
      <a
        key={'previous'}
        id={'previous'}
        onClick={this.goPreviousPage}
      >
        &lt;
      </a>
    )
  }

  render() {
    const { count, itemPerPage } = this.props;
    if (count <= itemPerPage) {
      return false;
    }
    return (
      <div className={classnames('page', styles.pagination)}>
        {this.renderPrevious()}
        {this.renderPageNumbers()}
        {this.renderNext()}
      </div>
    );
  }
}

PageLinks.PropTypes = {
  count: PropTypes.number.isRequired,
  itemPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};