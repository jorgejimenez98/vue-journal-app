import { shallowMount } from "@vue/test-utils";
import AboutView from "@/views/AboutView";

describe("AboutView.vue", () => {
  it("AboutView must match on snapshot", () => {
    const wrapper = shallowMount(AboutView);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
