import * as types from '../constants/ActionTypes';

const initialState = {
  currentPageNo: 0,
  pageSize: 2
};

export default function pagination(state = initialState, action) {
  switch (action.type) {

    case types.UPDATE_AFTER_CHANGE:
      const {currentPageNo} = action;
      return {
        ...state,
        currentPageNo
      };

    case types.SET_PAGE:
      return {
        ...state,
        currentPageNo: action.pageNo
      };

    default:
      return state;
  }
}
