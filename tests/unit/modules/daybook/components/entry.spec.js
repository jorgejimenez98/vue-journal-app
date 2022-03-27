import { shallowMount } from "@vue/test-utils";
import EntryItem from "@/modules/daybook/components/EntryItem";
import { journalState } from "../../../../mocks/test-journal.state";

describe("Pruebas en EntryList component", () => {
  let wrapper;
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    };
    wrapper = shallowMount(EntryItem, {
      props: {
        item: journalState.entries[0],
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  test("Debe de hacer match con el snapchot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Debe de redireccionar al hacer click en el entry-container", () => {
    const routerDIV = wrapper.find('[data-testID="divRouter"]');
    routerDIV.trigger("click");

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "-MydYHMLNbG63wnW4nuS" },
    });
  });

  test("Pruebas en las props computadas", () => {
    expect(wrapper.vm.day).toBe(20);
    expect(wrapper.vm.month).toBe("Marzo");
    expect(wrapper.vm.yearDay).toBe("2022, Domingo");
  });
});
