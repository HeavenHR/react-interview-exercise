import * as types from '../constants/ActionTypes';
import * as genders from '../constants/GenderTypes';

const initialState = {
  friendsById: [
    {
      name: 'Theodore Roosevelt',
      starred: true,
      gender: genders.GENDER_TYPE.MALE,
    },
    {
      name: 'Abraham Lincoln',
      starred: false,
      gender: genders.GENDER_TYPE.MALE,
    },
    {
      name: 'George Washington',
      starred: false,
      gender: genders.GENDER_TYPE.FEMALE,
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
            name: action.name,
            starred: false,
            gender: action.gender,
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item, index) => index !== action.id),
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
