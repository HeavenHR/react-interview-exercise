import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import AddFreindInput from '../AddFriendInput';
import { GENDER, MALE } from '../../constants/ActionTypes';

configure({ adapter: new Adapter() });

let propsData = {};
let mockFunction;
describe('Add Input Test Suits', () => {
  beforeEach(() => {
    mockFunction = jest.fn(event => event);
    propsData = {
      addFriend: mockFunction
    }
  });
  it('it should render correctly', () => {
    const componentWrapper = mount(<AddFreindInput {...propsData} />);
    expect(componentWrapper.find("input[type='radio']").length).toBe(GENDER.length);
    expect(componentWrapper.find("input[type='text']").length).toBe(1);
    expect(componentWrapper.find('button').length).toBe(1);

  });

  it('simulate submit on empty name field in form', () => {
    const componentWrapper = mount(<AddFreindInput {...propsData} />);
    componentWrapper.setState({ name: '', gender: MALE, error: null });
    expect(componentWrapper.state().error).toBeNull();
    componentWrapper.find('button').simulate('click');
    expect(componentWrapper.state().error).not.toBeNull();
  });

  it('simulate submit on complete form', () => {
    const componentWrapper = mount(<AddFreindInput {...propsData} />);
    componentWrapper.setState({ name: 'Herat Dhruv', gender: MALE, error: null });
    componentWrapper.find('button').simulate('click');
    expect(componentWrapper.state().error).toBeNull();
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});