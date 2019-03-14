import React from 'react';

import Pagination from './Pagination';
import { createMountedComponent, mockFunction } from '../../utils/testutil';


describe('<Pagination /> should', () => {
  let mountedPagination;
  let pages;

  beforeEach(() => {
    mountedPagination = createMountedComponent({
      children: <Pagination updatePagination={mockFunction} />
    });

    pages = mountedPagination.find('li.page-item').map(item => item);
  });

  it('render correctly according to props', () => {
    expect(mountedPagination.htmlRender()).toMatchSnapshot();
    expect(pages.length).toEqual(5);
    expect(pages[0].hasClass('disabled')).toBeTruthy();
  });

  it('render next set of pages, when currentPage > pageRange', () => {
    pages[4].simulate('click');
    pages[4].simulate('click');
    pages[4].simulate('click');
    pages[4].simulate('click');

    expect(mountedPagination.htmlRender()).toMatchSnapshot();
    expect(mountedPagination.props().updatePagination).toBeCalledWith(2);
    expect(mountedPagination.props().updatePagination).toBeCalledWith(3);
    expect(mountedPagination.props().updatePagination).toBeCalledWith(4);
    expect(mountedPagination.props().updatePagination).toBeCalledWith(5);
    expect(mountedPagination.state().currentPage).toEqual(5);
  });
});