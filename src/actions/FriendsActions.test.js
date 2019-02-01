import React from 'react';
import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import * as types from '../constants/ActionTypes';

describe('Actions/Friends', () => {
  test('addFriend should return the correct action object', () => {
    const data = {
      name: 'friend-name',
      gender: 'gender'
    }
    const addedAction = addFriend(data);
    expect(addedAction.data.name).toBe(data.name);
    expect(addedAction.data.gender).toBe(data.gender);
    expect(addedAction.type).toBe(types.ADD_FRIEND);
  });

  test('deleteFriend should return the correct action object', () => {
    const id = 'test-id'
    const addedAction = deleteFriend(id);
    expect(addedAction.id).toBe(id);
    expect(addedAction.type).toBe(types.DELETE_FRIEND);
  });

  test('starFriend should return the correct action object', () => {
    const id = 'test-id'
    const addedAction = starFriend(id);
    expect(addedAction.id).toBe(id);
    expect(addedAction.type).toBe(types.STAR_FRIEND);
  });
});
