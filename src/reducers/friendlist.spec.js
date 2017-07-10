import friendlist from './friendlist';
import deepFreeze from 'deep-freeze';

describe('Friendlist reducer behavior', () => {
  it('should return the initial state', () => {
    expect(
      friendlist(undefined, {})
    ).toEqual({
      friendsById: [
        {
          name: 'Theodore Roosevelt',
          starred: true
        },
        {
          name: 'Abraham Lincoln',
          starred: false
        },
        {
          name: 'George Washington',
          starred: false
        }
      ]
    })
  });

  it('should add new friend', () => {
    const stateBefore = {
      friendsById: [
        {
          name: 'Theodore Roosevelt',
          starred: true
        },
        {
          name: 'Abraham Lincoln',
          starred: false
        },
        {
          name: 'George Washington',
          starred: false
        }
      ]
    };

    const action = {
      type: "ADD_FRIEND",
      name: "ABCDEF",
      gender:"male"
    };

    const stateAfter = {
      friendsById: [
        {
          name: 'Theodore Roosevelt',
          starred: true
        },
        {
          name: 'Abraham Lincoln',
          starred: false
        },
        {
          name: 'George Washington',
          starred: false
        },
        {
          name: 'ABCDEF',
          gender:"male"
        }
      ]
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(friendlist(stateBefore, action)).toEqual(stateAfter);
  });

  it('should delete friend', () => {
    const stateBefore = {
      friendsById: [
        {
          name: 'Theodore Roosevelt',
          starred: true
        },
        {
          name: 'Abraham Lincoln',
          starred: false
        },
        {
          name: 'George Washington',
          starred: false
        }
      ]
    };

    const action = {
      type: "DELETE_FRIEND",
      id: 1
    };

    const stateAfter = {
      friendsById: [
        {
          name: 'Theodore Roosevelt',
          starred: true
        },
        {
          name: 'George Washington',
          starred: false
        }
      ]
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(friendlist(stateBefore, action)).toEqual(stateAfter);
  });
});