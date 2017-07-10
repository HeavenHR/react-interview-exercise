import * as types from '../constants/ActionTypes';

const initialState = {
  currentPageNo: 0,
  pageSize: 2
};

export default function pagination(state = initialState, action) {
  switch (action.type) {

    case types.SET_PAGE:
      const {pageNo} = action;
      return {
        ...state,
        currentPageNo: pageNo
      };

    default:
      return state;
  }
}
