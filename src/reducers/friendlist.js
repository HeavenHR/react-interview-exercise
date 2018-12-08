import { random } from "lodash";

import * as types from "../constants/ActionTypes";
import { MALE } from "./../constants/PageTypes";

const initialState = {
  friendsById: [
    {
      id: random(10000, 1000000, false),
      name: "Theodore Roosevelt",
      gender: MALE,
      starred: true
    },
    {
      id: random(10000, 1000000, false),
      name: "Abraham Lincoln",
      gender: MALE,
      starred: false
    },
    {
      id: random(10000, 1000000, false),
      name: "George Washington",
      gender: MALE,
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
            name: action.friend.name,
            gender: action.friend.gender,
            id: random(10000, 1000000, false)
          }
        ]
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item) => item.id !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item) => item.id === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };

    default:
      return state;
  }
}
