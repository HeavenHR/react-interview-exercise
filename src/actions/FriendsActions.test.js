import * as actions from '.';
import * as types from '../constants/ActionTypes';
import { sampleFriend, sampleId } from '../utils/testutil';

describe('FriendActions ', () => {
  it('addFriend action creator should return correct action object', () => {
    const addFriendAction = actions.addFriend(sampleFriend);

    expect(addFriendAction.type).toEqual(types.ADD_FRIEND);
    expect(addFriendAction.friend).toEqual(sampleFriend);
  });
  
  it('deleteFriend action creator should return correct action object', () => {
    const deleteFriendAction = actions.deleteFriend(sampleId);

    expect(deleteFriendAction.type).toEqual(types.DELETE_FRIEND);
    expect(deleteFriendAction.id).toEqual(sampleId);
  });

  it('starFriend action creator should return correct action object', () => {
    const starFriendAction = actions.starFriend(sampleId);

    expect(starFriendAction.type).toEqual(types.STAR_FRIEND);
    expect(starFriendAction.id).toEqual(sampleId);
  });
});