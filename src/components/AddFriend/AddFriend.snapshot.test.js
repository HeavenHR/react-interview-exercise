import React from 'react';

import AddFriend from './AddFriend';
import AddFriendInput from '../AddFriendInput';
import ButtonGroup from '../ButtonGroup';

import { createMountedComponent, sampleFriend } from '../../utils/testutil';


describe('<AddFriend /> should', () => {
  const mountedAddFriend = createMountedComponent({
    children: <AddFriend addFriend={localStorage.actions.addFriend} />
  });

  const inputField = mountedAddFriend.find(AddFriendInput);
  const buttonGroup = mountedAddFriend.find(ButtonGroup);

  it('render correctly', () => {
    expect(mountedAddFriend.htmlRender()).toMatchSnapshot();
    expect(inputField).toHaveLength(1);
    expect(buttonGroup).toHaveLength(1);
  });

  it('simulate addFriend action when click gender button with friend name', () => {
    inputField.props().onChange(sampleFriend.name);
    expect(mountedAddFriend.state().name).toEqual(sampleFriend.name);
    buttonGroup.props().onClick(sampleFriend.gender);
    expect(mountedAddFriend.props().addFriend).toBeCalledWith(sampleFriend);
    // console.log(mountedAddFriend.state());
    expect(mountedAddFriend.state()).toEqual({ name: '', gender: '', validation: {} });
  });

  it('validate name and gender on input submit', () => {
    inputField.props().onSubmit();
    expect(mountedAddFriend.state().validation).toEqual({ 'genderInvalid': true, 'nameInvalid': true });
  })

  it('validate name on gender selection', () => {
    buttonGroup.props().onClick(sampleFriend.gender);
    expect(mountedAddFriend.state().validation).toEqual({ 'genderInvalid': false, 'nameInvalid': true });
  })
});
