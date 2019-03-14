import * as actions from '.';
import * as types from '../constants/ActionTypes';
import { sampleId } from '../utils/testutil';

describe('PaginationActions ', () => {
  it('updatePagination action creator should return correct action object', () => {
    const updatePageAction = actions.updatePagination(sampleId);

    expect(updatePageAction.type).toEqual(types.UPDATE_PAGINATION);
    expect(updatePageAction.currentPage).toEqual(sampleId);
  });
});
