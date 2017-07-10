import pagination from './pagination';
import deepFreeze from 'deep-freeze';

describe('Pagination reducer behavior', () => {
  it('should return the initial state', () => {
    expect(
      pagination(undefined, {})
    ).toEqual({
      currentPageNo: 0,
      pageSize: 2
    })
  });

  it('should set new page', () => {

    const stateBefore = {
      currentPageNo: 0,
      pageSize: 2
    };

    const action = {
      type: "SET_PAGE",
      pageNo: 123
    };

    const stateAfter = {
      currentPageNo: 123,
      pageSize: 2
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(pagination(stateBefore, action)).toEqual(stateAfter);
  });
});