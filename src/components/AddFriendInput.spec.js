import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {default as AddFriendInput} from './AddFriendInput';

describe('AddFriendInput behavior', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<AddFriendInput addFriend={()=>{}}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call addFriend with name & gender after field change and btn click, also should clear values from state', () => {
    const addFriend = jest.fn();
    const sh = shallow(
      <AddFriendInput addFriend={addFriend}/>
    );

    sh.find('input').simulate('change', {target: {value: 'sample'}});
    sh.find('select').simulate('change', {target: {value: 'male'}});

    expect(sh.find('input').props().value).toEqual('sample');
    expect(sh.find('select').props().value).toEqual('male');

    sh.find('button').simulate('click');

    expect(addFriend.mock.calls[0][0]).toEqual('sample');
    expect(addFriend.mock.calls[0][1]).toEqual('male');
    expect(sh.state()).toEqual({name:'', gender:''});

    expect(sh.find('input').props().value).toEqual('');
    expect(sh.find('select').props().value).toEqual('');
  });

  it('should call addFriend with name & gender when ENTER pressed on name', () => {
    const addFriend = jest.fn();
    const sh = shallow(
      <AddFriendInput addFriend={addFriend}/>
    );

    sh.find('input').simulate('change', {target: {value: 'sample'}});
    sh.find('select').simulate('change', {target: {value: 'male'}});

    sh.find('input').simulate('keyDown',{which:13, target:{value:'sample'}}); //ENTER on text input

    expect(addFriend.mock.calls[0][0]).toEqual('sample');
    expect(addFriend.mock.calls[0][1]).toEqual('male');
    expect(sh.state()).toEqual({name:'', gender:''});
  });

  it('should call addFriend with name & gender when ENTER pressed on select', () => {
    const addFriend = jest.fn();
    const sh = shallow(
      <AddFriendInput addFriend={addFriend}/>
    );

    sh.find('input').simulate('change', {target: {value: 'sample'}});
    sh.find('select').simulate('change', {target: {value: 'male'}});

    sh.find('select').simulate('keyDown',{which:13});  //ENTER on select input

    expect(addFriend.mock.calls[0][0]).toEqual('sample');
    expect(addFriend.mock.calls[0][1]).toEqual('male');
    expect(sh.state()).toEqual({name:'', gender:''});
  });
});