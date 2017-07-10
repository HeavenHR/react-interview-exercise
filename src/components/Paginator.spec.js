import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {default as Paginator} from './Paginator';

describe('Paginator behavior', () => {

  it('should match snapshot', () => {
    const component = renderer.create(<Paginator setPage={()=>{}}
                                                 length={3}
                                                 currentPageNo={0}
                                                 pageSize={2}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call setPage() with correct number when various buttons clicked, and should activate the btn with current page num', () => {

    const setPage = jest.fn();

    const sh = shallow(
      <Paginator setPage={setPage}
                 length={7}
                 currentPageNo={2}  //page #3
                 pageSize={2}/>
    );

    //paging looks like this: [<<][1][2][3][>>]

    sh.find('button').at(0).simulate('click');
    sh.find('button').at(1).simulate('click');
    sh.find('button').at(2).simulate('click');
    sh.find('button').at(3).simulate('click');
    sh.find('button').at(4).simulate('click');

    expect(setPage.mock.calls[0][0]).toEqual(1);  //button with "<<" = go to page 2 - 1
    expect(setPage.mock.calls[1][0]).toEqual(0);  //button with "1" = go to page 0
    expect(setPage.mock.calls[2][0]).toEqual(1);  //button with "2" = go to page 1
    expect(setPage.mock.calls[3][0]).toEqual(2);  //button with "3" = go to page 2
    expect(setPage.mock.calls[4][0]).toEqual(3);  //button with ">>" = go to page 2 + 1

    expect(sh.find('button').at(0).hasClass('active')).toEqual(false);
    expect(sh.find('button').at(1).hasClass('active')).toEqual(false);
    expect(sh.find('button').at(2).hasClass('active')).toEqual(false);
    expect(sh.find('button').at(3).hasClass('active')).toEqual(true); //btn with "3" should be the only one active
    expect(sh.find('button').at(4).hasClass('active')).toEqual(false);
  });
});
