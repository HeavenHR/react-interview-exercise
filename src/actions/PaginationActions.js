import * as types from '../constants/ActionTypes';

/**
 * tries to update page to <pageNo>,
 * if no records on that page then go to last page where exists record
 * @param pageNo
 * @returns {function(*, *)}
 */
export function setPage(pageNo) {
  return (dispatch, getState) => {
    const {pagination: {pageSize}, friendlist: {friendsById}} = getState();
    //calc list belonging to page <pageNo>
    let newList = friendsById.slice(pageNo * pageSize, pageNo * pageSize + pageSize);
    //if empty, then recursively set prev page
    if (!newList.length && pageNo > 0) {
      dispatch(setPage(pageNo - 1));
    }
    else{
      dispatch({
        type: types.SET_PAGE,
        pageNo
      });
    }
  }
}

/**
 * updates currently viewed page in case records deleted and need to go back to last page
 * @returns {function(*, *)}
 */
export function updateAfterChange() {
  return (dispatch, getState) => {
    let currentPageNo = getState().pagination.currentPageNo;
    dispatch(setPage(currentPageNo));
  }
}

/**
 * goes to last page in order to view the last record when record created and put to front
 * @returns {function(*, *)}
 */
export function showLastPage() {
  return (dispatch, getState) => {
    const {pagination: {pageSize}, friendlist: {friendsById}} = getState();
    const lastPage = Math.ceil(friendsById.length / pageSize);
    dispatch(setPage(lastPage));
  };
}