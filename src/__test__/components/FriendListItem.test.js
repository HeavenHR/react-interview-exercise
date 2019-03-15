import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import FriendListItem from "../../components/FriendListItem";

configure({ adapter: new Adapter() });

describe("Should test <FriendListItem /> component", () => {
  const props = {
    name: "Michael",
    gender: "Male",
    starFriend: jest.fn(),
    deleteFriend: jest.fn()
  };

  it("Should render component", () => {
    const wrapper = shallow(<FriendListItem {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("Should handle click event for starFriend button", () => {
    const wrapper = shallow(<FriendListItem {...props} />);
    wrapper
      .find(".star")
      .at(0)
      .simulate("click");
    expect(wrapper.instance().props.starFriend).toBeCalled;
  });

  it("Should handle click event for deleteFriend button", () => {
    const wrapper = shallow(<FriendListItem {...props} />);
    wrapper
      .find(".delete")
      .at(0)
      .simulate("click");
    expect(wrapper.instance().props.deleteFriend).toBeCalled;
  });
});
