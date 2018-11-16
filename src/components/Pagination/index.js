import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const time = new Date().getTime();

class Pagination extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedPageIndex: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePrevButtonClick = this.handlePrevButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPageIndex !== this.props.selectedPageIndex) {
      this.setState({
        selectedPageIndex: nextProps.selectedPageIndex
      });
    }
  }

  handleChange(e) {
    this.updatePageIndex(Number(e.target.value));
  }

  handlePrevButtonClick(e) {
    this.updatePageIndex(this.props.selectedPageIndex - 1);
  }

  handleNextButtonClick(e) {
    this.updatePageIndex(this.props.selectedPageIndex + 1);
  }

  updatePageIndex(pageIndex) {
    this.setState({
      selectedPageIndex: pageIndex
    });

    this.props.onPageSelect(pageIndex);
  }

  render() {
    const { friendsListByChunks = [], selectedPageIndex = 0 } = this.props;
    const pagesCount = friendsListByChunks.length;

    return(
      <div className={`${styles.container}`}>
        {pagesCount > 1 && (
          <div className={`pagination ${styles.buttonGroup}`}>
            {/* disabled-attribute must be provided to disable the button on edge cases */}
            <button
              type="button"
              className="btn prev"
              // Declaring Anonymous function for onClick-event-handler is a performance issue, so used this.handlePrevButtonClick.
              {...(selectedPageIndex === 0 ? {disabled: true} : {onClick: this.handlePrevButtonClick})}
            >
              <span className="glyphicon glyphicon-chevron-left" />
            </button>
            <select className={`${styles.select}`} value={selectedPageIndex} onChange={this.handleChange}>
              {friendsListByChunks.map((friends, key) => (
                /**
                 * Using "time = new Date().getTime()" to create unique-keys, usually any item from the API-response will be having unique_id,
                 *  then there is no need to construct unique-keys like this.
                 */
                <option key={`${time}_${key}`} value={key}>page {key + 1} of {pagesCount}</option>
              ))}
            </select>
            {/* disabled-attribute must be provided to disable the button on edge cases */}
            <button
              type="button"
              className="btn next"
              // Declaring Anonymous function for onClick-event-handler is a performance issue, so used this.handleNextButtonClick.
              {...(selectedPageIndex === pagesCount - 1 ? {disabled: true} : {onClick: this.handleNextButtonClick})}
            >
              <span className="glyphicon glyphicon-chevron-right" />
            </button>
          </div>
        )}
      </div>
    );
  }
}

Pagination.propTypes = {
  friendsListByChunks: PropTypes.array.isRequired,
  onPageSelect: PropTypes.func.isRequired,
  selectedPageIndex: PropTypes.number.isRequired
};

export default Pagination;
