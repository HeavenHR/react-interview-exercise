import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mockFunction } from './utils/testutil';

configure({ adapter: new Adapter() });

const localStorageMock = {
  actions: {
    addFriend: mockFunction,
    deleteFriend: mockFunction,
    starFriend: mockFunction,
    updatePagination: mockFunction,
  }
};

global.localStorage = localStorageMock;