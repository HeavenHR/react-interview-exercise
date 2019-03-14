import reducer from "../../reducers/friendlist";
import * as types from "../../constants/ActionTypes";

describe("friendlist reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
  });
});
