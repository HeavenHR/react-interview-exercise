import { UPDATE_PAGINATION } from '../constants/ActionTypes';

export const initialState = {
  pageSize: 2,
  currentPage: 1,
  pagingRange: 3
};

export const pagination = (state = initialState, action) => {
  const { type, currentPage } = action;
  switch (type) {
    case UPDATE_PAGINATION: {
      return {
        ...state,
        currentPage
      };
    }

    default:
      return state;
  }
};
