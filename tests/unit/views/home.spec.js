import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView.vue", () => {
  it("HomeView must match on snapshot", () => {
    const wrapper = shallowMount(HomeView);

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("hacsr click en un boton debe de redireccionar al no-entry", () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find("button").trigger("click");

    expect(mockRouter.push).toHaveBeenCalled();
    // Evaluar el param del router
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
