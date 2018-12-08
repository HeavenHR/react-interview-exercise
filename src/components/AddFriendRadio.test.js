import React from 'react';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';

import AddFriendRadio from './AddFriendRadio';

import {MALE, FEMALE} from './../constants/PageTypes'

configure({ adapter: new Adapter() });

describe('Component: AddFriendRadio', () => {
  const props = {
    gender: MALE,
    onHandleChange: jest.fn(),
  };

  const wrapper = shallow(<AddFriendRadio {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('test onchange of input Radio', () => {
    wrapper.find('input').first().simulate('change', {target: {value: MALE}});
    wrapper.find('input').last().simulate('change', {target: {value: FEMALE}});
    expect(props.onHandleChange.mock.calls.length).toBe(2);
  });
});
