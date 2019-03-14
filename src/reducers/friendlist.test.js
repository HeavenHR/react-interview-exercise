import friends, { initialState } from './friendlist';
import {
  addFriendAction,
  deleteFriendAction,
  expectedAddFriendState,
  expectedDeleteFriendState,
  starFriendAction,
  expectedStarFriendState
} from '../utils/testutil';

describe('friendlist reducer should', () => {
  it('return the initialState', () => {
    expect(friends(undefined, {})).toEqual(initialState);
  });

  it('trigger ADD_FRIEND action and add new friend in state', () => {
    const updatedState = friends(undefined, addFriendAction);

    expect(updatedState).toEqual(expectedAddFriendState);
  });

  it('trigger DELETE_FRIEND action and remove friend by id in state', () => {
    const updatedState = friends(undefined, deleteFriendAction);

    expect(updatedState).toEqual(expectedDeleteFriendState);
  });

  it('trigger STAR_FRIEND action and update starred by id in state', () => {
    const updatedState = friends(undefined, starFriendAction);

    expect(updatedState).toEqual(expectedStarFriendState);
  });
});
