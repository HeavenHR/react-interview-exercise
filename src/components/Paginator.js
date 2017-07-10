import React, {Component, PropTypes} from 'react';
import {times} from 'lodash';
import classnames from 'classnames';

class Paginator extends Component {
  render() {
    const {setPage, length, pageSize, currentPageNo} = this.props;
    return (
      <div>
        <button className={classnames('btn', 'btn-default')}
                onClick={() => this.changePageOffset(-1)}>&laquo;</button>
        { times(Math.ceil(length / pageSize), pageNo => <button key={pageNo}
                                                                className={classnames('btn',
                                                                  'btn-default',
                                                                  {'active': currentPageNo === pageNo})}
                                                                onClick={() => setPage(pageNo)}>
          {pageNo + 1}
        </button>) }
        <button className={classnames('btn', 'btn-default')}
                onClick={() => this.changePageOffset(1)}>&raquo;</button>
      </div>
    );
  }

  changePageOffset(offset) {
    const {setPage, currentPageNo} = this.props;
    let newPage = currentPageNo + offset;
    if (newPage < 0) {
      newPage = 0;
    }
    setPage(newPage);
  }
}

Paginator.propTypes = {
  setPage: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  currentPageNo: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Paginator
