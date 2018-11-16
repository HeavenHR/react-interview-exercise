import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * 'enzyme-adapter-react-15' is to run with 'react: ^15.5.4',
 *  for reference https://github.com/airbnb/enzyme.
 */
import Adapter from 'enzyme-adapter-react-15';

import Pagination from './index';

// Should configure enzyme to use the adapter you want it to use.
Enzyme.configure({ adapter: new Adapter() });

const friends = [
  [
    {
      "name": "Theodore Roosevelt",
      "starred": true
    },
    {
      "name": "Abraham Lincoln",
      "starred": false
    }
  ],
  [
    {
      "name": "George Washington",
      "starred": false
    }
  ]
];

describe('Pagination-Component Test Cases', () => {
  it('should render Pagination-Component with prev, select & next buttons', () => {
    const onPageSelect = sinon.spy();
    const wrapper = shallow(<Pagination friendsListByChunks={friends} onPageSelect={onPageSelect} selectedPageIndex={0} />);
    expect(wrapper.find('.pagination')).to.have.lengthOf(1);
    expect(wrapper.find('.prev')).to.have.lengthOf(1);
    expect(wrapper.find('select')).to.have.lengthOf(1);
    expect(wrapper.find('.next')).to.have.lengthOf(1);
  });
  
  it('should render Pagination-Component with 2-options in select-drop-down-menu', () => {
    const onPageSelect = sinon.spy();
    const wrapper = shallow(<Pagination friendsListByChunks={friends} onPageSelect={onPageSelect} selectedPageIndex={0} />);
    expect(wrapper.find('.pagination select option')).to.have.lengthOf(2);
  });

  it('On first-page, prev-button click-event should be disabled', () => {
    const onPageSelect = sinon.spy();
    const wrapper = shallow(<Pagination friendsListByChunks={friends} onPageSelect={onPageSelect} selectedPageIndex={0} />);
    wrapper.find('.prev').simulate('click');
    expect(onPageSelect).to.have.property('callCount', 0);
  });

  it('On last-page, next-button click-event should be disabled', () => {
    const onPageSelect = sinon.spy();
    const wrapper = shallow(<Pagination friendsListByChunks={friends} onPageSelect={onPageSelect} selectedPageIndex={friends.length - 1} />);
    wrapper.find('.next').simulate('click');
    expect(onPageSelect).to.have.property('callCount', 0);
  });

  it('simulate click-event on prev-button', () => {
    const onPageSelect = sinon.spy();
    const wrapper = shallow(<Pagination friendsListByChunks={friends} onPageSelect={onPageSelect} selectedPageIndex={1} />);
    wrapper.find('.prev').simulate('click');
    expect(onPageSelect).to.have.property('callCount', 1);
    expect(wrapper.instance().state.selectedPageIndex).to.equal(0);
  });

  it('simulate click-event on next-button', () => {
    const onPageSelect = sinon.spy();
    const wrapper = shallow(<Pagination friendsListByChunks={friends} onPageSelect={onPageSelect} selectedPageIndex={0} />);
    wrapper.find('.next').simulate('click');
    expect(onPageSelect).to.have.property('callCount', 1);
    expect(wrapper.instance().state.selectedPageIndex).to.equal(1);
  });

  it('simulate change-event on select-option', () => {
    const onPageSelect = sinon.spy();
    const wrapper = shallow(<Pagination friendsListByChunks={friends} onPageSelect={onPageSelect} selectedPageIndex={0} />);
    wrapper.find('select').simulate('change', { target: { value: 1 } });
    expect(wrapper.instance().state.selectedPageIndex).to.equal(1);
  });
});
