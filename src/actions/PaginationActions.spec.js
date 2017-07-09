
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as cart from './PaginationActions'
import expect from 'expect'

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('........', () => {

  var store;
  beforeEach(() => {
    store = mockStore({
      friendlist:{
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

  it('.....', (done) => {

    store.dispatch(cart.setPage(1))

    //store.dispatch(cart.showLastPage())

    console.log(store.getActions())


    done();



  });

});