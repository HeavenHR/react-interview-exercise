import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import AddFreindInput from "../../components/AddFriendInput";
import { addFriend } from "../../actions/FriendsActions";

configure({ adapter: new Adapter() });

describe("Should test AddFriendInput form", () => {
  it("Should render component", () => {
    const wrapper = shallow(<AddFreindInput />);
    expect(wrapper.exists()).toBe(true);
  });

  it("Should test search text box change", () => {
    const wrapper = shallow(<AddFreindInput />);
    wrapper.find("input[type='text']").simulate("change", {
      target: { value: "text" }
    });
    expect(wrapper.find("input[type='text']").props().value).toEqual("text");
    expect(wrapper.find("input[type='text']").props().value).not.toEqual("");
  });

  it("Should test gender select dropdown change", () => {
    const wrapper = shallow(<AddFreindInput />);
    wrapper.find("select").simulate("change", {
      target: { value: "Female" }
    });
    expect(wrapper.find("select").props().value).toEqual("Female");
    expect(wrapper.find("select").props().value).not.toEqual("");
  });

  it("addFriend form should call alert when name, gender are empty", () => {
    const state = { name: "", gender: "" };
    const expectedArgs = "Please enter all form fields: name, gender";
    window.alert = jest.fn();
    const wrapper = shallow(<AddFreindInput />);
    wrapper.setState(state);
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(window.alert).toHaveBeenCalledWith(expectedArgs);
  });

  it("Form submission should trigger validateForm method", () => {
    const wrapper = shallow(<AddFreindInput />);
    const instance = wrapper.instance();
    instance.validateForm = jest.fn();
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(instance.validateForm).toBeCalled;
  });

  it("Form submission should trigger validateForm method", () => {
    const name = "Einstein";
    const gender = "Male";
    const mockFunction = jest.fn(event => event);
    const propsData = {
      addFriend: mockFunction
    };
    const wrapper = shallow(<AddFreindInput {...propsData} />);
    const instance = wrapper.instance();
    instance.validateForm = jest.fn();
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(instance.validateForm).toBeCalled;
    expect(instance.props.addFriend).toBeCalled;
    instance.props.addFriend(name, gender);
    expect(instance.props.addFriend).toBeCalledWith(name, gender);
  });
});
