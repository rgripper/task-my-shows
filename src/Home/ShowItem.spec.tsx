import * as React from "react";
import { shallow } from "enzyme";
import { ShowItem } from "./ShowItem";

describe("<ShowItem />", () => {
  const setup = (onPlayTrailer: () => void) => {
    return shallow(<ShowItem posterUrl="" rating={80} title="Some title" year={2018} onPlayTrailer={onPlayTrailer}/>);
  };

  it("should render successfully", () => {
    const onPlayTrailer = jest.fn();
    const wrapper = setup(onPlayTrailer);

    expect(wrapper).toMatchSnapshot();

  });

  it("should have a clickable open-trailer button", () => {
    const onPlayTrailer = jest.fn();
    const wrapper = setup(onPlayTrailer);

    const icon = wrapper.find('button > .fa-youtube');
    expect(icon.exists());
    icon.parent().simulate('click');
    expect(onPlayTrailer).toBeCalled();
  });
});
