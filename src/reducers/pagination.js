import * as types from '../constants/ActionTypes';

import { initialState as friendlistInitialState } from './friendlist';

const initialState = {
  page: 1,
  itemsPerPage: 2,
  size: friendlistInitialState.friendsById.length
};

export default function pagination(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_PAGE:
      return {
        ...state,
        page: action.nextPage
      };
    case types.ADD_FRIEND:
      return {
        ...state,
        size: state.size + 1,
        page: resizePage(state.size + 1, state.itemsPerPage)
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        size: state.size - 1,
        page: resizePage(state.size - 1, state.itemsPerPage)
      };
    default:
      return state;
  }
}

export const selectors = {
  getItemsForPage: (pagination, items) => {
    return items.slice(startIndex(pagination), endIndex(pagination));
  }
};

function resizePage(size, itemsPerPage) {
  return Math.round(size / itemsPerPage);
}

function startIndex({page, itemsPerPage}) {
  return page * itemsPerPage - itemsPerPage;
}

function endIndex({page, itemsPerPage}) {
  return page * itemsPerPage;
}

