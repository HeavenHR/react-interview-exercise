import React from "react";
import FriendList from "./FriendList";
import * as enzyme from "enzyme";
import * as genders from "../constants/GenderTypes";
import Adapter from "enzyme-adapter-react-15";
import * as sinon from "sinon";

enzyme.configure({ adapter: new Adapter() });

describe("<FriendList />", () => {
  test("should render without pagination", () => {
    const friends = [
      {
        name: "Name 1",
        starred: true,
        gender: genders.GENDER_TYPE.MALE
      },
      {
        name: "Name 2",
        starred: false,
        gender: genders.GENDER_TYPE.FEMALE
      }
    ];
    const spy = sinon.spy();
    const actions = {
      addFriend: spy,
      deleteFriend: spy,
      starFriend: spy
    };

    const props = {
      currentPage: 1,
      friends: friends,
      actions: actions
    };
    console.log(wrapper.debug());
    const wrapper = enzyme.shallow(<FriendList {...props} />);

    expect(wrapper.find("Pagination").length).toBe(0);
    expect(wrapper.find("FriendListItem").length).toBe(2);
  });

  test("should render with pagination and display correct on page items", () => {
    const friends = [
      {
        name: "Name 1",
        starred: true,
        gender: genders.GENDER_TYPE.MALE
      },
      {
        name: "Name 2",
        starred: false,
        gender: genders.GENDER_TYPE.FEMALE
      },
      {
        name: "Name 3",
        starred: true,
        gender: genders.GENDER_TYPE.MALE
      },
      {
        name: "Name 4",
        starred: false,
        gender: genders.GENDER_TYPE.FEMALE
      }
    ];

    const spy = sinon.spy();
    const actions = {
      addFriend: spy,
      deleteFriend: spy,
      starFriend: spy
    };

    const props = {
      currentPage: 2, // page 2
      friends: friends,
      actions: actions
    };

    const wrapper = enzyme.shallow(<FriendList {...props} />);
    expect(wrapper.find("Pagination").length).toBe(1);
    const items = wrapper.find("FriendListItem");
    expect(items.length).toBe(2);
    // must display items on page 2
    expect(items.first().prop("id")).toBe(2);
    expect(items.last().prop("id")).toBe(3);
  });
});
