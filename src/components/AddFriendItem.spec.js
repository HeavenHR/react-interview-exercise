import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {default as FriendListItem} from './FriendListItem';

describe('FriendListItem behavior', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<FriendListItem
      id={123}
      name={'sample'}
      gender={'male'}
      starred={true}
      starFriend={()=>{}}
      deleteFriend={()=>{}}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call starFriend & deleteFriend when clicking on 2 buttons, should pass id as arg', () => {
    const starFriend = jest.fn();
    const deleteFriend = jest.fn();

    const sh = shallow(
      <FriendListItem
        id={123}
        name={'sample'}
        gender={'male'}
        starred={false}
        starFriend={starFriend}
        deleteFriend={deleteFriend}/>
    );

    sh.find('button').at(0).simulate('click');
    sh.find('button').at(1).simulate('click');

    expect(starFriend.mock.calls[0][0]).toEqual(123);
    expect(deleteFriend.mock.calls[0][0]).toEqual(123);

    sh.setProps({ id: 456 });

    sh.find('button').at(0).simulate('click');
    sh.find('button').at(1).simulate('click');

    expect(starFriend.mock.calls[1][0]).toEqual(456);
    expect(deleteFriend.mock.calls[1][0]).toEqual(456);
  });


  it('should change btn class when starred', () => {
    const starFriend = jest.fn();
    const deleteFriend = jest.fn();

    const sh = shallow(
      <FriendListItem
        id={123}
        name={'sample'}
        gender={'male'}
        starred={false}
        starFriend={starFriend}
        deleteFriend={deleteFriend}/>
    );

    expect(sh.find('button').at(0).find('i').hasClass('fa-star-o')).toEqual(true);
    expect(sh.find('button').at(0).find('i').hasClass('fa-star')).toEqual(false);

    sh.setProps({ starred: true });

    expect(sh.find('button').at(0).find('i').hasClass('fa-star-o')).toEqual(false);
    expect(sh.find('button').at(0).find('i').hasClass('fa-star')).toEqual(true);
  });
});