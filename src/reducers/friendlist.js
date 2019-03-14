import * as types from "../constants/ActionTypes";

const initialState = {
  friendsById: [
    {
      name: "Theodore Roosevelt",
      starred: true,
      gender: "Male"
    },
    {
      name: "Abraham Lincoln",
      starred: false,
      gender: "Male"
    },
    {
      name: "George Washington",
      starred: false,
      gender: "Male"
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          {
            name: action.name,
            gender: action.gender
          },
          ...state.friendsById
        ]
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter(
          (item, index) => index !== action.id
        )
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
