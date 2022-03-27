import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "../../../../../mocks/test-journal.state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe("VUEX - Pruebas en el journal module", () => {
  // Basicas
  test("este es el estado inicial, debe de tener este state", () => {
    const store = createVuexStore(journalState);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations
  test('mutation: setEntries', () => { 
    const store = createVuexStore({isLoading: true, entries: []});
    store.commit('journal/setEntries', journalState.entries)
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
   })
});
