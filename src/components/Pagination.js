import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "./Pagination.css";

class Pagination extends Component {

    render () {
        const pageSize = this.props.pageSize;
        const displayItem = this.props.displayItem;
        let start = 1;
        let pages = [];
        const totalPage = Math.ceil(this.props.total / pageSize);
        const pageIndex = this.props.currentIndex;        
        const windowSize = Math.floor(displayItem / pageSize);
        const upperPage = totalPage - (pageIndex + windowSize);

        if (displayItem > totalPage) {
            pages = this.createPagination(pageIndex, 1, totalPage);
        } else {
            if (upperPage > 0) { 
                // has more space for upper bound
                start = pageIndex - upperPage;
            } else {
                start = totalPage - displayItem + 1;
            }

            if (start <= 0) start = 1;
    
            pages = this.createPagination(pageIndex, start, displayItem);
        }

        const prevButton = totalPage > 2 && pageIndex !== 1 
        ? <button 
            id='prev-button' 
            onClick={this.handlePrevClick.bind(this)}
            className="btn btn-default"
            > 
            {"< Prev"}
        </button>
        : null;

        const nextButton = totalPage > 2 && pageIndex !== totalPage
        ? <button 
            id='next-button'
            onClick={this.handleNextClick.bind(this)}
            className="btn btn-default"
            > 
            {"Next >"}
        </button>
        : null;

        return (
        <div className={styles.pageStyle}>
            {prevButton}
            {pages}
            {nextButton}
        </div>
        )
    }

    createPagination(activeIndex, start, number) {
        const pages = [];
        for (let i=0; i<number; i++) {
            if (start === activeIndex) {
                pages.push(<span key={start}> {start} </span>)
            } else {
                pages.push(<a 
                    key={start}
                    data-index={start} 
                    onClick={this.handleClick.bind(this)}> {start} </a>);
            }
            
            start++;
        }
        return pages;
    }

    handlePrevClick(e) {
        this.notifyPageChanged(this.props.currentIndex - 1);
    }

    handleNextClick(e) {
        this.notifyPageChanged(this.props.currentIndex + 1);
    }

    handleClick(e){        
        const index = Number(e.target.dataset.index);
        this.notifyPageChanged(index);        
    }

    notifyPageChanged(index) {
        if (this.props.pageChanged) {
            this.props.pageChanged(index);
        }
    }
}

Pagination.propTypes = {
    currentIndex: PropTypes.any.isRequired,
    total: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    displayItem: PropTypes.number.isRequired,
    pageChanged: PropTypes.func,
};

export default Pagination