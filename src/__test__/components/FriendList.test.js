import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import FriendList from "../../components/FriendList";
import data from "../mockData/mockData";

configure({ adapter: new Adapter() });

describe("Should test <FriendList /> component", () => {
  const props = {
    friends: {
      friendsById: [
        {
          name: "Theodore Roosevelt",
          starred: true,
          gender: "Male"
        },
        {
          name: "Abraham Lincoln",
          starred: false,
          gender: "Male"
        }
      ]
    }
  };

  const actions = {
    addFriend: jest.fn(),
    deleteFriend: jest.fn(),
    starFriend: jest.fn()
  };

  it("Should render component", () => {
    const wrapper = shallow(
      <FriendList friends={props.friends.friendsById} actions={actions} />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should not render pagination", () => {
    const wrapper = shallow(
      <FriendList friends={props.friends.friendsById} actions={actions} />
    );
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("should not render pagination", () => {
    props.friends.friendsById.push({
      name: "Einstein",
      starred: true,
      gender: "Male"
    });
    const wrapper = shallow(
      <FriendList friends={props.friends.friendsById} actions={actions} />
    );
    expect(wrapper.find("div")).toHaveLength(2);
  });

  it("should render only seven buttons if there are more than 4 pages", () => {
    const wrapper = shallow(
      <FriendList friends={data.friends.friendsById} actions={actions} />
    );
    expect(wrapper.find("button")).toHaveLength(6);
  });

  it("Should handle page click event", () => {
    const wrapper = shallow(
      <FriendList friends={data.friends.friendsById} actions={actions} />
    );
    const state = {
      currentPage: "1"
    };
    wrapper
      .find("button")
      .at(1)
      .simulate("click", {
        target: state.currentPage
      });
    wrapper.instance().setState(state);
    expect(wrapper.instance().handlePageClick).toBeCalled;
  });

  it("Should handle prev button click event", () => {
    const wrapper = shallow(
      <FriendList friends={data.friends.friendsById} actions={actions} />
    );
    wrapper.find("button.prev").simulate("click", {
      target: 2
    });
    expect(wrapper.instance().handlePageClick).toBeCalled;
    expect(wrapper.instance().state.currentPage).toBe(1);
  });

  it("Should handle Next button click event", () => {
    const wrapper = shallow(
      <FriendList friends={data.friends.friendsById} actions={actions} />
    );
    wrapper.find(".next").simulate("click", {
      target: 1
    });
    expect(wrapper.instance().handleNextClick).toBeCalled;
    expect(wrapper.instance().state.currentPage).toBe(2);
  });
});
