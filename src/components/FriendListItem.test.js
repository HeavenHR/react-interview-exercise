import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import sinon from 'sinon';

/**
 * 'enzyme-adapter-react-15' is to run with 'react: ^15.5.4',
 *  for reference https://github.com/airbnb/enzyme.
 */
import Adapter from 'enzyme-adapter-react-15';

import FriendListItem from './FriendListItem';

// Should configure enzyme to use the adapter you want it to use.
Enzyme.configure({ adapter: new Adapter() });

describe('FriendListItem-Component Test Cases', () => {
  it('should render FriendListItem-Component with starred, delete & gender buttons', () => {
    const starFriend = sinon.spy();
    const genderFriend = sinon.spy();
    const wrapper = shallow(<FriendListItem id={0} name={'Amar'} gender={`male`} starFriend={starFriend} genderFriend={genderFriend} />);
    expect(wrapper.find('.starred')).to.have.lengthOf(1);
    expect(wrapper.find('.delete')).to.have.lengthOf(1);
    expect(wrapper.find('.gender')).to.have.lengthOf(1);
  });

  it('simulate click-event on male-gender-checkbox', () => {
    const starFriend = sinon.spy();
    const genderFriend = sinon.spy();
    const wrapper = shallow(<FriendListItem id={0} name={'Amar'} gender={`male`} starFriend={starFriend} genderFriend={genderFriend} />);
    wrapper.find('.male').simulate('change', { target: { checked: true } });
    expect(genderFriend).to.have.property('callCount', 1);
  });

  it('simulate click-event on female-gender-checkbox', () => {
    const starFriend = sinon.spy();
    const genderFriend = sinon.spy();
    const wrapper = shallow(<FriendListItem id={0} name={'Amar'} gender={`male`} starFriend={starFriend} genderFriend={genderFriend} />);
    wrapper.find('.female').simulate('change', { target: { checked: true } });
    expect(genderFriend).to.have.property('callCount', 1);
  });
});
