import React from 'react';

import ButtonGroup from './ButtonGroup';
import { createMountedComponent, buttonGroupProps } from '../../utils/testutil';
import ErrorMessage from '../ErrorMessage';

describe('<ButtonGroup /> should', () => {
  let mountedButtonGroup;
  let buttons;

  beforeEach(() => {
    mountedButtonGroup = createMountedComponent({
      children: <ButtonGroup {...buttonGroupProps} />
    });

    buttons = mountedButtonGroup.find('button').map(item => item);
  });

  it('render correctly according to props', () => {
    const icons = mountedButtonGroup.find('i').map(item => item);

    expect(mountedButtonGroup.htmlRender()).toMatchSnapshot();
    expect(buttons.length).toEqual(2);
    expect(icons.length).toEqual(2);
    expect(icons[0].hasClass('fa fa-male')).toBeTruthy();
    expect(icons[1].hasClass('fa fa-female')).toBeTruthy();
    expect(mountedButtonGroup.state().selected).toEqual('');
  });

  it('render error message when has invalid prop', () => {
    const mountedButtonGroup = createMountedComponent({
      children: <ButtonGroup {...buttonGroupProps} isInvalid={true} />
    });

    expect(mountedButtonGroup.find('div.form-group').hasClass('has-error')).toBeTruthy();
    expect(mountedButtonGroup.find(ErrorMessage)).toHaveLength(1);
  });

  it('updates state and call onClick function on first button click', () => {
    buttons[0].simulate('click');

    expect(mountedButtonGroup.state().selected).toEqual('male');
    expect(mountedButtonGroup.props().onClick).toBeCalledWith('male');
  });

  it('updates state and call onClick function on second button click', () => {
    buttons[1].simulate('click');

    expect(mountedButtonGroup.state().selected).toEqual('female');
    expect(mountedButtonGroup.props().onClick).toBeCalledWith('female');
  });
});