import { pagination, initialState } from './pagination';
import {
  updatePaginationAction,
  expectedUpdatedPaginationState
} from '../utils/testutil';

describe('pagination reducer should', () => {
  it('return the initialState', () => {
    expect(pagination(undefined, {})).toEqual(initialState);
  });

  it('trigger UPDATE_PAGINATION action and update current page in state', () => {
    const updatedState = pagination(undefined, updatePaginationAction);

    expect(updatedState).toEqual(expectedUpdatedPaginationState);
  })
});
