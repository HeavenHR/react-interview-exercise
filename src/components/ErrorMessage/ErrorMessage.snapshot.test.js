import React from 'react';
import { mount } from 'enzyme';
import { ErrorMessage } from '..';
import { inputProps } from '../../utils/testutil';

describe('<ErrorMessage /> should', () => {
  it('render correctly according to props', () => {
    const mountedErrorMessage = mount(<ErrorMessage message={inputProps.errorMessage} />)

    expect(mountedErrorMessage.html()).toMatchSnapshot();
    expect(mountedErrorMessage.find('span').contains(inputProps.errorMessage)).toBeTruthy();
    expect(mountedErrorMessage.find('span').hasClass('help-block')).toBeTruthy();
  });
});