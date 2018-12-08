import React, { PropTypes } from "react";
import classnames from "classnames";
import styles from "./FriendListPagination.css";

const FriendListPagination = (props) => {
  const { page, totalPages, onPageChange, isNextPagePresent, ispreviousPagePresent } = props;
  return (
    <div className={classnames(styles.friendListPagination, "text-center")}>
      <button
        className={`btn btn-default`}
        disabled={!ispreviousPagePresent}
        onClick={() => {
          onPageChange("previous");
        }}>
        <i className={"fa fa-chevron-left"} />
      </button>
      <label className={styles.friendListPaginationPageNumber}>
        {page} of {totalPages}
      </label>
      <button
        className={`btn btn-default`}
        disabled={!isNextPagePresent}
        onClick={() => {
          onPageChange("next");
        }}>
        <i className='fa fa-chevron-right' />
      </button>
    </div>
  );
};

FriendListPagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  isNextPagePresent: PropTypes.bool,
  ispreviousPagePresent: PropTypes.bool
};

export default FriendListPagination;
