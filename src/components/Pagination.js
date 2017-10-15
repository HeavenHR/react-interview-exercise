import React, { Component, PropTypes } from 'react';

class Pagination extends Component {

  render () {
    const { pagination, size, onUpdatePage } = this.props;

    if (pagination.itemsPerPage >= size) {
      return null;
    }

    const pages = this.createPages();

    return (
      <div>
        {pages.map(page => (
          <button key={`page:${page}`} 
                  onClick={() => onUpdatePage(page)} 
                  disabled={pagination.page === page}>
                  {page}
          </button>
        ))}
      </div>
    );
  }

  createPages () {
    const numberOfPages = Math.round(this.props.size / this.props.pagination.itemsPerPage);
    const pages = [...new Array(numberOfPages)];

    return pages.map((_, index) => index + 1);
  }
}

Pagination.propTypes = {
  size: PropTypes.number.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    itemsPerPage: PropTypes.number
  }),
  onUpdatePage: PropTypes.func.isRequired
};

export default Pagination;
