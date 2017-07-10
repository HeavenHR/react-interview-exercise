import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import FriendListApp from './FriendListApp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {shallow} from 'enzyme';


import {setPage, updateAfterChange} from '../actions/PaginationActions';

const mockStore = configureMockStore([thunk]);

describe('FriendListApp behavior', () => {

  var store = mockStore({
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

  it('should match snapshot', () => {
    const component = renderer.create(
      <Provider store={store}>
        <FriendListApp />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should check correctness of all passed properties, even when props changed', () => {
    const sh = shallow(
      <Provider store={store}>
        <FriendListApp store={store}/>
      </Provider>
      )
      .dive() //go into Provider
      .dive() //go into FriendListApp
    ;

    expect(sh.find('AddFriendInput').length).toEqual(1)
    expect(sh.find('FriendList').length).toEqual(1)
    expect(sh.find('Paginator').length).toEqual(1)

    expect( sh.find('FriendList').props().friends)
      .toEqual({ '0': { name: 'Theodore Roosevelt', starred: true },
      '1': { name: 'Abraham Lincoln', starred: false } })

    expect( sh.find('Paginator').props().length).toEqual(3)

    sh.setProps({         //change page to #2 (index #1)
      pagination: {
        currentPageNo: 1,
        pageSize: 2
      }
    });

    expect( sh.find('FriendList').props().friends)
      .toEqual({ '2': { name: 'George Washington', starred: false } })

    sh.setProps({       //replace friendlist to something else
      friendlist: {
        friendsById: [
          {name:"aaaa"},
          {name:"bbbb"},
          {name:"cccc"},
          {name:"dddd"},
        ]
      },
    });

    //should still display elements of page #2 (2 last)

    expect( sh.find('FriendList').props().friends)
      .toEqual({ '2': { name: 'cccc' }, '3': { name: 'dddd' } })
  });


});