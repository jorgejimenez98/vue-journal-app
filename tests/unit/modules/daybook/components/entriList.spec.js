import { createStore } from "vuex";
import EntriList from "@/modules/daybook/components/EntriList";
import { getEntriesByTerm } from "@/modules/daybook/store/journal/getters";
import { journalState } from "../../../../../tests/mocks/test-journal.state";
import { shallowMount } from "@vue/test-utils";

describe("Entry List: component test", () => {
  const journalMockModule = {
    namespaced: true,
    getters: {
      getEntriesByTerm,
    },
    state: () => ({
      isLoading: false,
      entries: journalState.entries,
    }),
  };

  const store = createStore({
    modules: {
      journal: { ...journalMockModule },
    },
  });

  const wrapper = shallowMount(EntriList, {
    props: {
      term: "",
    },
    global: {
      mocks: {
        /* $router: mockRouter */
      },
      plugins: [store],
    },
  });

  test("Debe de llamar al getEntriesBytermi sin termino y mostrar 2 entradas", () => {
    console.log(wrapper.html());
  });
});
