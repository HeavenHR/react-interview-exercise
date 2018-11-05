import React from 'react';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PageLinks from '../PageLinks';

configure({ adapter: new Adapter() });

let propsData = {};

describe('Pagination Test suits', () => {

  it('only render in case of more than 2 entries', () => {
    propsData = {
      count: 3,
      itemPerPage: 2,
      page: 1,
    };
    const component = mount(<PageLinks {...propsData} />);
    expect(component.find('.page').length).toBe(1);
    expect(component.find('#previous').length).toBe(1);
    expect(component.find('#next').length).toBe(1);
    expect(component.find('.pageLinks').length).toBeLessThan(propsData.count);
  });

  it('in case of 2 or less than 2 entry it should not render', () => {
    propsData = {
      count: 2,
      itemPerPage: 2,
      page: 1,
    };
    const component = mount(<PageLinks {...propsData} />);
    expect(component.find('.page').length).toBe(0);
    propsData = {
      count: 0,
      itemPerPage: 2,
      page: 1,
    };
    const componentWrapper = mount(<PageLinks {...propsData} />);
    expect(componentWrapper.find('.page').length).toBe(0);
  });

  it('simulate a click to check the behaviour', () => { 
    const mockFunction = jest.fn(x => x);
    propsData = {
      count: 3,
      itemPerPage: 2,
      page: 1,
      handleClick : mockFunction
    };
    const component = mount(<PageLinks {...propsData} />);
    const pagelink = component.find('.pageLinks');
    pagelink.at(1).simulate('click');
    component.update();
    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction.mock.calls[0][0]).toBe(pagelink.get(1).props.id);
  });

  it('in case of previous button click state in current page should be -1',()=>{
    const mockFunction = jest.fn(x => x);
    propsData = {
      count: 3,
      itemPerPage: 2,
      page: 2,
      handleClick : mockFunction
    };
    const component = mount(<PageLinks {...propsData} />);
    const previousPagination = component.find('#previous');
    previousPagination.simulate('click');
    expect(mockFunction.mock.calls[0][0]).toBe(propsData.page-1);
  });

  it('in case of next button click state in current page should be +1',()=>{
    const mockFunction = jest.fn(x => x);
    propsData = {
      count: 3,
      itemPerPage: 2,
      page: 1,
      handleClick : mockFunction
    };
    const component = mount(<PageLinks {...propsData} />);
    const previousPagination = component.find('#next');
    previousPagination.simulate('click');
    expect(mockFunction.mock.calls[0][0]).toBe(propsData.page+1);
  });

  it('in case of next button click and there is no more data it should not change the page',()=>{
    const mockFunction = jest.fn(x => x);
    propsData = {
      count: 3,
      itemPerPage: 2,
      page: 2,
      handleClick : mockFunction
    };
    const component = mount(<PageLinks {...propsData} />);
    component.setState({
      firstPage: 1,
      lastPage: Math.ceil(propsData.count / propsData.itemPerPage),
    });
    const previousPagination = component.find('#next');
    previousPagination.simulate('click');
    component.update();
    expect(mockFunction.mock.calls.length).toBe(0);
  });

});