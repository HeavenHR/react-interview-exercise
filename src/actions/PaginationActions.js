import * as types from '../constants/ActionTypes';

export function updatePage(nextPage) {
  return {
    type: types.UPDATE_PAGE,
    nextPage
  };
}
