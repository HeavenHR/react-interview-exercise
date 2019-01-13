import React from 'react';
import { addFriend, deleteFriend, starFriend } from '../actions/FriendsActions';
import * as types from '../constants/ActionTypes';

describe('Testing FriendsActions', () => {
    test('addFriend should return correct object from given arguments', () => {
        const name = 'full-name';
        const gender = 'gender';
        const addedAction = addFriend(name, gender);
        expect(addedAction.name).toBe(name);
        expect(addedAction.gender).toBe(gender);
        expect(addedAction.type).toBe(types.ADD_FRIEND);
    });
});