import uuidv1 from 'uuid/v1';

import * as types from '../constants/ActionTypes';

export const initialState = {
  friendsById: [
    {
      id: uuidv1(),
      name: 'Theodore Roosevelt',
      starred: true
    },
    {
      id: uuidv1(),
      name: 'Abraham Lincoln',
      starred: false
    },
    {
      id: uuidv1(),
      name: 'George Washington',
      starred: false
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            id: uuidv1(),
            name: action.name
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter(item => item.id !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item, index) => index === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };

    default:
      return state;
  }
}
