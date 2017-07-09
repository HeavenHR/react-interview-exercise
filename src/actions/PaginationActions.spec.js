import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import * as actions from './PaginationActions'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Pagination actions', () => {
  var store;
  beforeEach(() => {
    store = mockStore({
      friendlist: {
        friendsById: [
          {
            name: 'Theodore Roosevelt',
            starred: true
          },
          {
            name: 'Abraham Lincoln',
            starred: false
          },
          {
            name: 'George Washington',
            starred: false
          }
        ]
      },
      pagination: {
        currentPageNo: 0,
        pageSize: 2
      }
    });

  });

  it('should go to page 0 that exists', (done) => {
    store.dispatch(actions.setPage(0));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_PAGE',
      pageNo: 0
    });
    done();
  });

  it('should go to page 1 that exists', (done) => {
    store.dispatch(actions.setPage(1));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_PAGE',
      pageNo: 1
    });
    done();
  });

  it('should go to page 1 when asked to go to 2 because we have only 2 pages [0,1]', (done) => {
    store.dispatch(actions.setPage(2));
    expect(store.getActions()[0]).toEqual({
      type: 'SET_PAGE',
      pageNo: 1
    });
    done();
  });

  it('should go to last page (=1)', (done) => {
    store.dispatch(actions.showLastPage());
    expect(store.getActions()[0]).toEqual({
      type: 'SET_PAGE',
      pageNo: 1
    });
    done();
  });


  it('should go to page 0 from 1 when there are only 2 records', (done) => {
    const state = store.getState();
    state.friendlist.friendsById.length = 2;
    state.pagination.currentPageNo = 1;
    store = mockStore(state);
    store.dispatch(actions.updateAfterChange());
    expect(store.getActions()[0]).toEqual({
      type: 'SET_PAGE',
      pageNo: 0
    });
    done();
  });
});