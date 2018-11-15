import React, { Component } from 'react';

import styles from './styles.css';

const time = new Date().getTime();

class Pagination extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pageIndexChanged: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePrevButtonClick = this.handlePrevButtonClick.bind(this);
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPageIndex !== this.props.selectedPageIndex) {
      this.setState(prevProps => ({
        pageIndexChanged: !prevProps.pageIndexChanged
      }));
    }
  }

  handleChange(e) {
    const pageIndex = Number(e.currentTarget.value);
    
    this.props.onPageSelect(pageIndex);
  }

  handlePrevButtonClick(e) {
    this.props.onPageSelect(this.props.selectedPageIndex - 1);
  }

  handleNextButtonClick(e) {
    this.props.onPageSelect(this.props.selectedPageIndex + 1);
  }

  render() {
    const { friendsListByChunks = [], selectedPageIndex = 0 } = this.props;
    const pagesCount = friendsListByChunks.length;

    return(
      <div className={`${styles.container}`}>
        {pagesCount > 1 && (
          <div className={`${styles.buttonGroup}`}>
            {/* disabled-attribute must be provided to disable the button on edge cases */}
            <button type="button" className="btn" onClick={this.handlePrevButtonClick} disabled={selectedPageIndex === 0} ><span className="glyphicon glyphicon-chevron-left" /></button>
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
            <button type="button" className="btn" onClick={this.handleNextButtonClick} disabled={selectedPageIndex === pagesCount - 1}><span className="glyphicon glyphicon-chevron-right" /></button>
          </div>
        )}
      </div>
    );
  }
}

export default Pagination;
