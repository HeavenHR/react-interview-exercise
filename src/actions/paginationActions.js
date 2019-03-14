import { UPDATE_PAGINATION } from '../constants/ActionTypes';

export const updatePagination = currentPage => ({
  type: UPDATE_PAGINATION,
  currentPage
});
