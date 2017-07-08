import React, {Component, PropTypes} from 'react';
import styles from './Paginator.css';
import {times} from 'lodash';
import classnames from 'classnames';

class Paginator extends Component {
    render() {
        const {setPage, length, pageSize, currentPageNo} = this.props;
        return (
            <div className={styles.paginator}>
                { times(Math.ceil(length / pageSize), pageNo => <button key={pageNo}
                                                                        className={classnames('btn',
                                                                            'btn-default',
                                                                            {'active': currentPageNo === pageNo})}
                                                                        onClick={() => setPage(pageNo)}>
                    {pageNo + 1}
                </button>) }
            </div>
        );
    }
}

Paginator.propTypes = {
    setPage: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    currentPageNo: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
};

export default Paginator
