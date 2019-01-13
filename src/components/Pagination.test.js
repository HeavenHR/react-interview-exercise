import React from "react";
import Pagination from "./Pagination";
import * as enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-15";
import * as sinon from "sinon";

enzyme.configure({ adapter: new Adapter() });

describe("<Pagination />", () => {
  test("should render with previous button, next button and page number ", () => {
    const props = {
      currentIndex: 3,
      total: 10,
      pageSize: 2,
      displayItem: 3
    };

    const wrapper = enzyme.shallow(<Pagination {...props} />);

    expect(wrapper.find("#prev-button").length).toBe(1);
    expect(wrapper.find("#next-button").length).toBe(1);
    expect(wrapper.find("span").length).toBe(1);
    expect(wrapper.find("a").length).toBe(props.displayItem - 1);
  });

  test("should render only next button and page number ", () => {
    const props = {
      currentIndex: 1,
      total: 6,
      pageSize: 2,
      displayItem: 3
    };

    const wrapper = enzyme.shallow(<Pagination {...props} />);

    expect(wrapper.find("#prev-button").length).toBe(0);
    expect(wrapper.find("#next-button").length).toBe(1);
    expect(wrapper.find("span").length).toBe(1);
    expect(wrapper.find("a").length).toBe(props.displayItem - 1);
  });

  test("should render only previous button and page number ", () => {
    const props = {
      currentIndex: 3,
      total: 6,
      pageSize: 2,
      displayItem: 3
    };

    const wrapper = enzyme.shallow(<Pagination {...props} />);

    expect(wrapper.find("#prev-button").length).toBe(1);
    expect(wrapper.find("#next-button").length).toBe(0);
    expect(wrapper.find("span").length).toBe(1);
    expect(wrapper.find("a").length).toBe(props.displayItem - 1);
  });

  test("should render only page number correctly ", () => {
    const props = {
      currentIndex: 1,
      total: 3,
      pageSize: 2,
      displayItem: 3
    };

    const wrapper = enzyme.shallow(<Pagination {...props} />);

    expect(wrapper.find("#prev-button").length).toBe(0);
    expect(wrapper.find("#next-button").length).toBe(0);
    expect(wrapper.find("span").length).toBe(1);
    expect(wrapper.find("a").length).toBe(1);
  });

  test("should notify correct page index when the pagination is clicked", () => {
    const onPageClicked = sinon.spy();
    const props = {
      currentIndex: 3,
      total: 10,
      pageSize: 2,
      displayItem: 3,
      pageChanged: onPageClicked
    };

    const clickedIndex = 4;
    const wrapper = enzyme.shallow(<Pagination {...props} />);
    const event = {
      target: { name: "click", dataset: { index: clickedIndex } }
    };
    wrapper
      .find("a")
      .first()
      .simulate("click", event);

    expect(onPageClicked.calledWith(clickedIndex)).toBeTruthy();
  });

  test("should notify correct page index when previous button is clicked", () => {
    const onPageClicked = sinon.spy();
    const props = {
      currentIndex: 3,
      total: 10,
      pageSize: 2,
      displayItem: 3,
      pageChanged: onPageClicked
    };

    const wrapper = enzyme.shallow(<Pagination {...props} />);
    wrapper
      .find("#prev-button")
      .first()
      .simulate("click");

    expect(onPageClicked.calledWith(props.currentIndex - 1)).toBeTruthy();
  });

  test("should notify correct page index when next button is clicked", () => {
    const onPageClicked = sinon.spy();
    const props = {
      currentIndex: 3,
      total: 10,
      pageSize: 2,
      displayItem: 3,
      pageChanged: onPageClicked
    };

    const wrapper = enzyme.shallow(<Pagination {...props} />);
    wrapper
      .find("#next-button")
      .first()
      .simulate("click");

    expect(onPageClicked.calledWith(props.currentIndex + 1)).toBeTruthy();
  });
});
