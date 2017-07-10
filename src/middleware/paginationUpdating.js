import { updateAfterChange, showLastPage } from '../actions/PaginationActions';
import * as types from '../constants/ActionTypes';

export const paginationUpdatingMiddleWare = store => next => action => {
  next(action);
  //if record deleted, need to check whether to go back 1 page if current has no records
  if (action.type === types.DELETE_FRIEND) {
    store.dispatch(updateAfterChange());
  }
  else if (action.type === types.ADD_FRIEND) {  //if record added, we go to last page to view it
    store.dispatch(showLastPage());
  }
};