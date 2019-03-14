import {
  addFriend,
  deleteFriend,
  starFriend
} from "../../actions/FriendsActions";
import * as types from "../../constants/ActionTypes";

describe("Should test actions", () => {
  test("Should return the correct object for addFriend action", () => {
    const addFriendAction = addFriend("name", "gender");
    expect(addFriendAction.name).toBe("name");
    expect(addFriendAction.gender).toBe("gender");
    expect(addFriendAction.type).toBe(types.ADD_FRIEND);
  });

  test("Should return the correct object for deleteFriend action", () => {
    const id = "id";
    const deleteFriendAction = deleteFriend(id);
    expect(deleteFriendAction.id).toBe(id);
    expect(deleteFriendAction.type).toBe(types.DELETE_FRIEND);
  });

  test("Should return the correct object for starFriend action", () => {
    const id = "id";
    const starFriendAction = starFriend(id);
    expect(starFriendAction.id).toBe(id);
    expect(starFriendAction.type).toBe(types.STAR_FRIEND);
  });
});
