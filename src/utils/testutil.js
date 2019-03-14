import { mount, shallow } from 'enzyme';
import { prettyPrint } from 'html';
import * as types from '../constants/ActionTypes';

export const mockFunction = jest.fn(value => value);

export const sampleFriend = {
  name: 'Sample friend',
  gender: 'male'
};

export const sampleId = 1;

export const createMountedComponent = ({ children, isShallow }) => {
  const mountedComponent = isShallow ? shallow(children) : mount(children);
  mountedComponent.htmlRender = () => prettyPrint(mountedComponent.html(), { indent_size: 2 });

  return mountedComponent;
};

export const inputProps = {
  value: 'sample name',
  onSubmit: mockFunction,
  onChange: mockFunction,
  isInvalid: false,
  errorMessage: 'Please fill friend name'
};

export const buttonGroupProps = {
  selected: '',
  options: [
    { value: 'male', showIcon: true },
    { value: 'female', showIcon: true }
  ],
  onClick: mockFunction,
  isInvalid: false,
  errorMessage: 'Please select gender'
};

export const changeEventObject = { target: { value: 'sample text' } };

export const samplePages = [1, 2, 3, 4, 5, 6, 7];

export const totalPages = samplePages.length;

export const addFriendAction = {
  type: types.ADD_FRIEND,
  friend: sampleFriend
};

export const expectedAddFriendState = {
  friendsById: [
    {
      name: 'Sample friend',
      gender: 'male'
    },
    {
      name: 'Theodore Roosevelt',
      starred: true,
      gender: 'male'
    },
    {
      name: 'Abraham Lincoln',
      starred: false,
      gender: 'male'
    },
    {
      name: 'George Washington',
      starred: false,
      gender: 'male'
    }
  ]
};

export const deleteFriendAction = {
  type: types.DELETE_FRIEND,
  id: 0
};

export const expectedDeleteFriendState = {
  friendsById: [
    {
      name: 'Abraham Lincoln',
      starred: false,
      gender: 'male'
    },
    {
      name: 'George Washington',
      starred: false,
      gender: 'male'
    }
  ]
};

export const starFriendAction = {
  type: types.STAR_FRIEND,
  id: 1
};

export const expectedStarFriendState = {
  friendsById: [
    {
      name: 'Theodore Roosevelt',
      starred: true,
      gender: 'male'
    },
    {
      name: 'Abraham Lincoln',
      starred: true,
      gender: 'male'
    },
    {
      name: 'George Washington',
      starred: false,
      gender: 'male'
    }
  ]
};

export const updatePaginationAction = {
  type: types.UPDATE_PAGINATION,
  currentPage: 2
};

export const expectedUpdatedPaginationState = {
  pageSize: 2,
  currentPage: 2,
  pagingRange: 3
};
