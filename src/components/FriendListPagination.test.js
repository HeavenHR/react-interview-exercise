import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import FriendListPagination from './FriendListPagination';

import { MALE } from './../constants/PageTypes';

configure({ adapter: new Adapter() });

describe('Component: FriendListPagination', () => {
  const props = {
    page: 2,
    totalPages: 3,
    onPageChange: jest.fn(),
    isNextPagePresent: true,
    ispreviousPagePresent: true,
  };

  const wrapper = shallow(<FriendListPagination {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('test pagionation label', () => {
    expect(
      wrapper
        .find('label')
        .first()
        .text()
    ).toBe(props.page + ' of ' + props.totalPages);
  });

  it('test next button click', () => {
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(props.onPageChange.mock.calls.length).toBe(1);
  });

  it('test previous button click', () => {
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(props.onPageChange.mock.calls.length).toBe(2);
  });

});
