import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import { shallow } from "react-test-renderer";
import AddFreindInput from "../../components/AddFriendInput";

configure({ adapter: new Adapter() });

let propsData = {};
let mockFunction;
describe("Add Input Test Suits", () => {
  beforeEach(() => {
    mockFunction = jest.fn(event => event);
    propsData = {
      addFriend: mockFunction
    };
  });
  it("it should render correctly", () => {
    const componentWrapper = mount(<AddFreindInput {...propsData} />);
    expect(componentWrapper.find("select").length).toBe(1);
    expect(componentWrapper.find("input[type='text']").length).toBe(1);
    expect(componentWrapper.find("input[type='submit']").length).toBe(1);
  });

  it("simulate submit on complete form", () => {
    const componentWrapper = mount(<AddFreindInput {...propsData} />);
    const name = "Albert Einstein";
    const gender = "Male";
    componentWrapper.setState({ name: name, gender: gender });
    componentWrapper.find("input[type='submit']").simulate("click");
    expect(componentWrapper.state().name).toBe(name);
    expect(componentWrapper.state().gender).toBe(gender);
    expect(mockFunction.mock.calls.length).toBe(0);
  });
});
