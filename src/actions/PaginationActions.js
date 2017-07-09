import * as types from '../constants/ActionTypes';

export function setPage(pageNo) {
  return dispatch => {
    dispatch({
      type: types.SET_PAGE,
      pageNo
    });
    dispatch(updateAfterChange());
  }
}

export function updateAfterChange() {
  return (dispatch, getState) => {
    const state = getState();
    const {pagination: {pageSize}, friendlist: {friendsById}} = state;
    let currentPageNo = state.pagination.currentPageNo;
    let newList = friendsById.slice(currentPageNo * pageSize, currentPageNo * pageSize + pageSize);
    if (!newList.length) {
      currentPageNo = currentPageNo > 0 ? currentPageNo - 1 : 0;
    }
    dispatch({
      type: types.UPDATE_AFTER_CHANGE,
      currentPageNo
    });
  }
}

export function showLastPage() {
  return (dispatch, getState) => {
    const {pagination: {pageSize}, friendlist: {friendsById}} = getState();
    dispatch({
      type: types.SET_PAGE,
      pageNo: Math.ceil(friendsById.length / pageSize)
    });
    dispatch(updateAfterChange());
  }
}