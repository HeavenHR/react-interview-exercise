import React from 'react';

import AddFriendInput from './AddFriendInput';
import { createMountedComponent, inputProps, changeEventObject } from '../../utils/testutil';
import ErrorMessage from '../ErrorMessage';

const newText = 'new text';

describe('<AddFriendInput /> should', () => {
  let mountedAddFriendInput;
  let input;

  beforeEach(() => {
    mountedAddFriendInput = createMountedComponent({
      children: <AddFriendInput {...inputProps} />
    });

    input = mountedAddFriendInput.find('input');
  });

  it('render correctly according to props', () => {
    expect(mountedAddFriendInput.htmlRender()).toMatchSnapshot();
    expect(input.props().type).toEqual('text');
    expect(input.props().value).toEqual(inputProps.value);
    expect(input.props().className).toEqual('form-control');
  });

  it('render error message when has invalid prop', () => {
    const mountedAddFriendInput = createMountedComponent({
      children: <AddFriendInput {...inputProps} isInvalid={true} />
    });

    expect(mountedAddFriendInput.find('div').hasClass('has-error')).toBeTruthy();
    expect(mountedAddFriendInput.find(ErrorMessage)).toHaveLength(1);
  });

  it('updates state and call onChange function on input change', () => {
    input.simulate('change', changeEventObject);

    expect(mountedAddFriendInput.state().value).toEqual('sample text');
    expect(mountedAddFriendInput.props().onChange).toBeCalledWith('sample text');
  });

  it('call onSubmit function on press enter key', () => {
    input.simulate('keyDown', { which: 13 });

    expect(mountedAddFriendInput.props().onSubmit).toBeCalled();
  });
});
